import React, { memo, useMemo, useCallback } from "react";
import "./TagListFotos.less";
import axios from "axios";

import { Tag, Avatar, Popover, Space } from "antd";
import { PictureOutlined } from "@ant-design/icons";

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
      {tags.map(({ name, url, size, uid }) => (
        <Popover
          key={uid}
          content={
            <Space style={{ maxWidth: 300 }}>
              <Avatar icon={<PictureOutlined />} src={url} />
              <div style={{ marginLeft: 8 }}>
                <h3 style={{ color: "var(--primary-color)", marginBottom: 0 }}>
                  {name}
                </h3>
                <span>
                  <Tag color="blue">
                    size: <b>{size}</b>
                  </Tag>
                </span>
              </div>
            </Space>
          }
          trigger="hover"
        >
          <Tag
            color="blue"
            onClick={() => download(url, name)}
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
          </Tag>
        </Popover>
      ))}
    </>
  );
};

export default memo(TagListFotos);