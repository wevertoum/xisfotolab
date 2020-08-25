import React, { useState, useContext } from "react";
import "./StepFotos.less";
import { Upload, Modal, message, Tag, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { storage as storageFirebase } from "../../utils/firebase";
import FadeLoading from "components/FadeLoading";
import CadastroContext from "contexts/CadastroContext";

const StepFotos: React.FC = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { fileList, setFileList, clienteEmail } = useContext(CadastroContext);

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const handleChange = (files: Models.FileLocal[]) => {
    if (files.length < fileList.length) {
      setFileList(files);
    }
  };

  const handleFireBaseUpload = (e: any) => {
    setLoading(true);
    const imageForReq = e.file;
    const path = `/fotos-enviadas/${clienteEmail}/${imageForReq.name}`;
    if (imageForReq === "") {
      message.error("Imagem inválida");
    }
    const uploadTask = storageFirebase.ref(path).put(imageForReq);
    uploadTask.on(
      "state_changed",
      (TaskState: any) => {},
      (err: any) => {
        message.error("erro no upload");
        console.error("erro no upload", err);
      },
      async function getUrl() {
        const imageRef = storageFirebase.ref(path);
        const url: string = await imageRef.getDownloadURL().catch((error) => {
          throw error;
        });
        console.log("url", url);
        setFileList((old: any) => [
          ...old,
          {
            uid: imageForReq.uid,
            size: imageForReq.size,
            name: imageForReq.name || "",
            url: url,
          },
        ]);
        setLoading(false);
      }
    );
  };

  return (
    <>
      <FadeLoading loading={loading} />
      <h3 className="title-general-step">Enviar fotos</h3>
      <Form.Item name="quantidade_fotos" style={{ display: "none" }}>
        <Input value={fileList.length} />
      </Form.Item>

      <Form.Item name="fotografias" style={{ display: "none" }}>
        <Input value={JSON.stringify(fileList)} />
      </Form.Item>

      {fileList.length > 0 && (
        <div className="tag-qtd">
          <Tag color="orange">Quantidade: {fileList.length}</Tag>
        </div>
      )}

      <div className="clearfix">
        <Upload
          accept="image/*"
          customRequest={handleFireBaseUpload}
          listType="picture-card"
          fileList={fileList as []}
          onPreview={handlePreview}
          onChange={({ fileList }) =>
            handleChange(fileList as Models.FileLocal[])
          }
          multiple
        >
          {uploadButton}
        </Upload>

        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    </>
  );
};

export default StepFotos;
