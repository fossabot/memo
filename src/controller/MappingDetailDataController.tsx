import React from 'react';
import MappingDetail from '../pages/MappingDetail';
import { DataSource } from 'mini-xmind/lib/canvas';
import { useFetchDocumentData } from '../hooks/useFetchDocumentData';
import {
  MarkdownEditorSaveProps,
  showMessageAfterFetching,
} from './MarkdownEditorDataController';

const MappingDetailDataController = (props: {
  match: { params: { id: string } };
}) => {
  const id: string = props.match.params.id;

  const handleOnSave = async () => {
    const params: MarkdownEditorSaveProps = {
      layout: data,
      id,
      category: 'mapping',
    };
    const response = await fetch('/document/update', {
      method: 'POST',
      body: JSON.stringify(params),
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.text();
    showMessageAfterFetching(result);
  };

  const [data, setData] = useFetchDocumentData(id, 'mapping', handleOnSave);

  const handleOnChange = (data: DataSource) => {
    setData(data);
  };

  return <MappingDetail dataSource={data} onChange={handleOnChange} />;
};

export default MappingDetailDataController;
