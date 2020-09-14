import React, { memo, useMemo, useCallback } from "react";
import "./TagListFotos.less";
import axios from "axios";

import {
  Tag,
  Avatar,
  Popover,
  Space,
  Card,
  Input,
  Row,
  Col,
  Button,
} from "antd";
import { PictureOutlined, DownloadOutlined } from "@ant-design/icons";
import Display from "components/Display";
import formatter from "utils/formatter";

interface Props {
  fotos: Models.FileLocal[];
}
const TagListFotos: React.FC<Props> = ({ fotos = [] }) => {
  const tags = useMemo(() => [...fotos], [fotos]);

  const getNomeLabel = useCallback(
    (nome: string) => (nome.length > 10 ? `${nome.slice(0, 10)}...` : nome),
    []
  );

  if (tags.length === 0) {
    return <></>;
  }

  const download = (url: string, name: string) => {
    axios({
      url: url,
      method: "GET",
      responseType: "blob",
    }).then((response: any) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name);
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <>
      {tags.map(({ name, url, size, uid, legenda, cor_borda, com_ima }) => (
        <Popover
          key={uid}
          content={
            <Space style={{ maxWidth: 300 }}>
              <Avatar icon={<PictureOutlined />} src={url} size={100} />
              <div style={{ marginLeft: 8 }}>
                <h3 style={{ color: "var(--primary-color)", marginBottom: 0 }}>
                  {name}
                </h3>
                <span>
                  <Tag color="blue">
                    tamanho:{" "}
                    <b>{formatter([(size || 0).toString(), "bytes"])}</b>
                  </Tag>
                </span>
              </div>
            </Space>
          }
          trigger="hover"
        >
          <div>
            <Card
              style={{ marginBottom: 8 }}
              title={[
                <Tag
                  className="tag-foto-item"
                  color="blue"
                  icon={
                    url ? (
                      <Avatar
                        src={url}
                        size={16}
                        style={{ marginBottom: 2, marginRight: 8 }}
                      />
                    ) : (
                      <PictureOutlined />
                    )
                  }
                >
                  {getNomeLabel(name)}
                </Tag>,
                <Button
                  icon={<DownloadOutlined />}
                  type="ghost"
                  size="middle"
                  onClick={() => download(url, name)}
                />,
              ]}
            >
              <Row gutter={16}>
                <Col span={6}>
                  <div>
                    <p>Cor da borda ({cor_borda || "não selecionada"})</p>
                    <Input
                      style={{ maxWidth: 150 }}
                      type="color"
                      disabled
                      value={cor_borda || "#ffffff"}
                    />
                  </div>
                </Col>
                <Col span={10}>
                  <Display>
                    Legenda:
                    {legenda || "Sem legenda"}
                  </Display>
                </Col>
                <Col span={8}>{com_ima && <h3>Com ímã</h3>}</Col>
              </Row>
            </Card>
          </div>
        </Popover>
      ))}
    </>
  );
};

export default memo(TagListFotos);
