/* eslint-disable no-underscore-dangle */
import { Card, Tabs } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';
import TableQuanLyDon from './components/TableQuanLyDon';

const { TabPane } = Tabs;

const QuanLyDon = () => {
  const {
    trangThaiQuanLyDon,
    setTrangThaiQuanLyDon,
    getAllBieuMauChuyenVienDieuPhoiModel,
    getAllBieuMauChuyenVienTiepNhanModel,
  } = useModel('dichvumotcuav2');

  const { pathname } = window.location;
  const arrPathName = pathname?.split('/') ?? [];
  useEffect(() => {
    if (arrPathName?.[arrPathName.length - 1] === 'quanlydondieuphoi')
      getAllBieuMauChuyenVienDieuPhoiModel();
    else getAllBieuMauChuyenVienTiepNhanModel();
  }, []);

  return (
    <Card bodyStyle={{ padding: '8px 24px 24px 24px' }} title="Quản lý đơn">
      <Tabs
        onChange={(key: string) => {
          setTrangThaiQuanLyDon(key);
        }}
        activeKey={trangThaiQuanLyDon}
      >
        <TabPane tab="Chờ xử lý" key="PENDING" />
        <TabPane tab="Duyệt" key="OK" />
        <TabPane tab="Không duyệt" key="NOT_OK" />
      </Tabs>
      <TableQuanLyDon />
    </Card>
  );
};

export default QuanLyDon;
