import type { HoSoXetTuyen } from '@/services/HoSoXetTuyen/typings';
import type { IColumn } from '@/utils/interfaces';
import { tongDiemUuTien } from '@/utils/utils';
import { Descriptions, Table } from 'antd';
import { useModel } from 'umi';
const { Item } = Descriptions;

const BlockNguyenVong = (props: {
  index?: number;
  title?: string;
  record?: { danhSachNguyenVong: HoSoXetTuyen.NguyenVong[] };
}) => {
  const modelHoSoXetTuyen = useModel('hosoxettuyen');
  const { record: recordDot } = useModel('dottuyensinh');
  const recordHoSo = props?.record?.danhSachNguyenVong
    ? props.record
    : modelHoSoXetTuyen.recordHoSo;
  const columnsNV: IColumn<HoSoXetTuyen.NguyenVong>[] = [
    {
      title: 'TT',
      dataIndex: 'soThuTu',
      align: 'center',
      width: '60px',
      render: (val, record) => (
        <div style={{ color: record?.wrong ? 'red' : '#000000D9' }}>{val}</div>
      ),
    },
    {
      title: 'Mã ngành',
      dataIndex: 'maNganhChuyenNganh',
      align: 'center',
      width: '100px',
      render: (val, record) => (
        <div style={{ color: record?.wrong ? 'red' : '#000000D9' }}>{val}</div>
      ),
    },
    {
      title: 'Tên ngành',
      dataIndex: 'tenNganhChuyenNganh',
      align: 'center',
      width: '150px',
      render: (val, record) => (
        <div style={{ color: record?.wrong ? 'red' : '#000000D9', whiteSpace: 'normal' }}>
          {val}
        </div>
      ),
    },
    {
      title: 'Cơ sở đào tạo',
      align: 'center',
      width: '150px',
      render: (nguyenVong) => (
        <div style={{ color: nguyenVong?.wrong ? 'red' : '#000000D9', whiteSpace: 'normal' }}>
          {nguyenVong?.coSoDaoTao?.ten || nguyenVong?.tenCoSoDaoTao}
        </div>
      ),
    },
    {
      title: 'Đối tượng xét tuyển',
      dataIndex: 'tenDoiTuong',
      align: 'center',
      width: '150px',
      render: (val, record) => (
        <div style={{ color: record?.wrong ? 'red' : '#000000D9', whiteSpace: 'normal' }}>
          {val}
        </div>
      ),
    },
    {
      title: 'Tổ hợp',
      dataIndex: 'toHopXetTuyen',
      align: 'center',
      width: '60px',
      render: (val, record) => (
        <div style={{ color: record?.wrong ? 'red' : '#000000D9' }}>{val}</div>
      ),
    },
    {
      title: 'Điểm xét tuyển chưa có ưu tiên',
      dataIndex: ['diemQuyDoi', 'thanhPhan'],
      align: 'center',
      width: '100px',
      render: (val: HoSoXetTuyen.ThanhPhanDiemQuyDoi[], record) => {
        const hienThiDiemQuyDoi = recordDot?.danhSachDoiTuongTuyenSinh?.find(
          (item) => item.maDoiTuong === record?.maDoiTuong,
        )?.hienThiDiemQuyDoi;
        const diem = record?.diemQuyDoi?.tongDiem
          ? record.diemQuyDoi.tongDiem - tongDiemUuTien(val)
          : 0;
        if (hienThiDiemQuyDoi) {
          return (
            <div style={{ color: record?.wrong ? 'red' : '#000000D9' }}>{diem?.toFixed(2)}</div>
          );
        } else return <div />;
      },
    },
    {
      title: 'Điểm xét tuyển có ưu tiên',
      dataIndex: ['diemQuyDoi', 'tongDiem'],
      align: 'center',
      width: '100px',
      render: (val, record) => {
        const hienThiDiemQuyDoi = recordDot?.danhSachDoiTuongTuyenSinh?.find(
          (item) => item.maDoiTuong === record?.maDoiTuong,
        )?.hienThiDiemQuyDoi;
        return (
          <div style={{ color: record?.wrong ? 'red' : '#000000D9' }}>
            {hienThiDiemQuyDoi ? val : ''}
          </div>
        );
      },
    },
    {
      title: 'Chi tiết thành phần',
      dataIndex: ['diemQuyDoi', 'thanhPhan'],
      render: (val: HoSoXetTuyen.ThanhPhanDiemQuyDoi[], record) => {
        const hienThiDiemQuyDoi = recordDot?.danhSachDoiTuongTuyenSinh?.find(
          (item) => item.maDoiTuong === record?.maDoiTuong,
        )?.hienThiDiemQuyDoi;
        return hienThiDiemQuyDoi ? (
          val
            ?.filter((item) => item?.tenThanhPhan)
            ?.map((item) => (
              <div style={{ color: record?.wrong ? 'red' : '#000000D9' }} key={item?._id}>
                {item?.tenThanhPhan}: {item?.diem ?? 0}
              </div>
            ))
        ) : (
          <div />
        );
      },
      align: 'center',
      // width: '120px',
    },
  ];

  return (
    <>
      <Descriptions>
        <Item
          span={3}
          label={
            <span style={{ fontWeight: 'bold' }}>
              {props?.index ? `${props?.index}.` : ''} {props?.title ?? 'Danh sách nguyện vọng'}
            </span>
          }
        >
          {' '}
        </Item>
      </Descriptions>

      <Table
        scroll={{ x: 1000 }}
        columns={columnsNV}
        dataSource={recordHoSo?.danhSachNguyenVong ?? []}
        size="small"
        pagination={false}
      />
    </>
  );
};

export default BlockNguyenVong;
