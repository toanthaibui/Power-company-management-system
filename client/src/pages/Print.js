import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useSelector } from "react-redux";

const Print = () => {
  const [customers, setCustomers] = useState([]);
  const params = useParams();
  const componentRef = useRef();
  const { user } = useSelector((state) => state.user);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
    onAfterPrint: () => alert("Print success"),
  });
  //getUsers
  const getCustomers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllCustomers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setCustomers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cus = customers.filter((item) => item.userId === params.id);

  useEffect(() => {
    getCustomers();
  }, []);
  if (user?.isAdmin === true) {
    return (
      <>
        <button
          className="btn btn-primary"
          style={{ margin: 20 }}
          onClick={handlePrint}
        >
          Lặp biên bản
        </button>
        <div ref={componentRef}>
          {cus?.map((item, idx) => (
            <div>
              <div className="text-center">
                <br></br>

                <h6>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h6>
                <u>
                  {" "}
                  <p>Độc lập - Tự do - Hạnh phúc</p>
                </u>
                <h4>HỢP ĐỒNG</h4>
                <h5>THI CÔNG LẮP ĐẶT ĐIỆN</h5>
                <p>SỐ:...........................</p>
              </div>
              <div style={{ marginLeft: 500 }}>
                <p>Cần Thơ, ngày ... tháng ... năm 20..</p>
              </div>
              <div style={{ marginLeft: 100, marginRight: 100 }}>
                <b>Bên A (Chủ đầu tư)</b>
                <p></p>
                <p>Họ và tên: {item.fullName}</p>
                <p>Số điện thoại: {item.phone}</p>
                <p>Email: {item.email}</p>
                <p>Số chứng minh thư/CCCD: {item.cccd}</p>
                <p>
                  Địa chỉ: {item.numberHouse}, {item.road}, {item.ward},{" "}
                  {item.district}, TP.Cần Thơ
                </p>
                <p>Mục đích sử dụng: {item.purpose}</p>
                <b>Bên B (Đơn vị thi công)</b>
                <p></p>
                <p>CÔNG TY ĐIỆN CẦN THƠ</p>
                <p>
                  Địa chỉ trụ sở: Phường Xuân Khánh,Quận Ninh Kiểu, TP.Cần Thơ
                </p>
                <p>
                  Người đại
                  diện:..........................................................
                  Chúc
                  danh:.....................................................
                </p>
                <p>
                  Số chứng minh
                  thư/CCCD:..................................................................................................................
                </p>
                <p>
                  Số điện
                  thoại:.........................................................................................................................................
                </p>
                <p>
                  Hai bên thống nhất ký hợp đồng thi công lắp đặt với các điều
                  khoản sau:
                </p>
                <b>Điều 1: Địa điểm, hạng mục thi công, tiến độ thi công</b>
                <p></p>
                <p>
                  1. Địa điểm thi công: {item.numberHouse}, {item.road},{" "}
                  {item.ward}, {item.district}, TP.Cần Thơ
                </p>
                <p>
                  2. Hạng mục thi công: Lắp đặt toàn bộ hệ thống điện trong công
                  trình.
                </p>
                <p>
                  3. Tiến độ thi công: Công trình được thi công và hoàn thành
                  trong vòng 30 ngày kể từ ngày ký hợp đồng.
                </p>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <b>Điều 2: Nghĩa vụ mỗi bên</b>
                <p></p>
                <b>Quyền và nghĩa vụ bên A</b>
                <p></p>
                <p>
                  1. Bên A có trách nhiệm giám sát tại công trình theo dõi chất
                  lượng vật liệu, chất lượng xây lắp, nếu thấy phần nào chưa đảm
                  bảo thì yêu cầu bên làm lại. Bên A có trách nhiemeh xác nhận
                  công tác phát sinh để làm cơ sở cho việc nghiệm thu và thanh
                  toán. Bên A xét thấy xâu lắp không đạt yêu câu được quyên
                  không ký vào biên bản nghiệm thu hoặc chưa nhận bàn giao.
                </p>
                <p>
                  2. Trách nhiệm của bên A phải: Bàn giao mặt bằng công trình,
                  Bàn giao mọi trang thiết bị cần thiết cho bên B.
                </p>
                <p></p>
                <b>Quyền và nghĩa vụ bên B</b>
                <p></p>
                <p>
                  1. Bên B phải chịu trách nhiệm chính về kỹ thuật và chất lượng
                  xây lắp toàn bộ công trình, bảo đảm thi công theo thiết kế phù
                  hợp với dự toán đã được duyệt, đúng quy trình, yêu cầu trong
                  xây dựng
                </p>
                <p>
                  2. Bên B muốn thay đổi loại vật liệu xây lắp nào hoặc thay đổi
                  phần thiết kế nào đều phải được sự chấp thuận của Bên A
                </p>
                <p>
                  3. Trách nhiệm của bên B: Quản lý thống nhất mặt bằng xây dựng
                  sau khi được giao, Tiếp nhận các loại vật liệu, vật tư, kỹ
                  thuật được bên A giao.
                </p>
                <p></p>
                <b>Diều 3: Nghiệm thu và bàn giao công trình</b>
                <p></p>
                <p>
                  1. Bên A có trách nhiệm thành lập và chủ trì hội đồng nghiệm
                  thu theo quy định của Nhà nước (có lập biên bản ghi rõ thành
                  phần).
                </p>
                <p>
                  2. Hội đồng nghiệm thu sẽ tiến hành nghiệm thu theo 4 đợt theo
                  từng khâu công việc chủ yếu, từng bộ phận, từng hạng mục công
                  trình và cuối cùng là toàn bộ công trình.
                </p>
                <p>
                  3. Bên B có trách nhiệm chuẩn bị các điều kiện cần thiêt để
                  nghiệm thu.
                </p>
                <p>
                  4. Sau khi nghiệm thực hiện xong việc nghiệm thu Bên B có
                  trách nghiệm bàn giao hạng mục công trình cùng với hồ sơ hoàn
                  thành công trình cho bên A
                </p>
                <b>Điều 4: Tạm ứng, thanh quyết toán</b>
                <p></p>
                <p>
                  1. Trong quá trình thi công, bên A sẽ tạm ứng bên B tương ứng
                  với khối lượng thực hiện nghiệm thu hàng tháng
                </p>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <p>
                  2. Ngay sau khi hợp đồng nghiệm thu tổng thể công trình và đưa
                  vào sử dụng, hai bên căn cứ vào hợp đồng và các phụ lục hoặc
                  biên bản bổ sung để quyết toán và thanh lý hợp đồng.
                </p>
                <b>Điều 5: Trách nhiệm mỗi bên</b>
                <p></p>
                <p>
                  1. Nếu bên B không hoàn thành công trình đúng thời hạn hợp
                  đồng do nguyên nhân chủ quan thì bị
                  phạt....................giá trị hợp đồng
                </p>
                <p>
                  2. Nếu bên B không đảm bảo chất lượng xây lắp phải chịu bù đắp
                  mọi tổn thất do việc sữa chữa lại và phải chịu
                  phạt..................giá trị dự toán phần không đảm bảo chất
                  lượng
                </p>
                <b>Điều 6: Thủ tục giải quyết tranh chấp hợp đồng</b>
                <p></p>
                <p>
                  1. Hai bên cam kết thực hiện đúng các điều khoản ghi trong hợp
                  đồng này
                </p>
                <p>
                  2. Hai bên chủ động thông báo cho nhau biết tiến độ thực hiện
                  hợp đồng. Nếu có vấn đề bất lợi gì phát sinh các bên phải kịp
                  thời báo cho nhau biết và chủ động thương lượng giải quyết đảm
                  bảo có lợi cho cả hai
                </p>
                <b>Điều 7: Hiệu lực của hợp đồng</b>
                <p></p>
                <p>
                  Hợp đồng này có hiệu lực từ
                  ngày.......................................đến
                  ngày....................................... Hai bên sẽ tổ chức
                  họp và lập biên bản thanh lý hợp động vào ngày
                  .......................................
                </p>
                <p>
                  Hợp đồng này được lập thành 2 bản có giá trị như nhau, mỗi bên
                  giữ 1 bản.
                </p>
                <br />
              </div>
              <b>
                <t style={{ marginLeft: 150 }}>ĐẠI DIỆN BÊN A</t>
                <t style={{ marginLeft: 250 }}>ĐẠI DIỆN BÊN B</t>
              </b>

              <br />
              <t style={{ marginLeft: 150 }}>(ký tên, đóng dấu)</t>
              <t style={{ marginLeft: 250 }}>(ký tên đóng dấu)</t>
            </div>
          ))}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div ref={componentRef}>
          {cus?.map((item, idx) => (
            <div>
              <div className="text-center">
                <br></br>

                <h6>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h6>
                <u>
                  {" "}
                  <p>Độc lập - Tự do - Hạnh phúc</p>
                </u>
                <h4>HỢP ĐỒNG</h4>
                <h5>THI CÔNG LẮP ĐẶT ĐIỆN</h5>
                <p>SỐ:...........................</p>
              </div>
              <div style={{ marginLeft: 500 }}>
                <p>Cần Thơ, ngày ... tháng ... năm 20..</p>
              </div>
              <div style={{ marginLeft: 100, marginRight: 100 }}>
                <b>Bên A (Chủ đầu tư)</b>
                <p></p>
                <p>Họ và tên: {item.fullName}</p>
                <p>Số điện thoại: {item.phone}</p>
                <p>Email: {item.email}</p>
                <p>Số chứng minh thư/CCCD: {item.cccd}</p>
                <p>
                  Địa chỉ: {item.numberHouse}, {item.road}, {item.ward},{" "}
                  {item.district}, TP.Cần Thơ
                </p>
                <p>Mục đích sử dụng: {item.purpose}</p>
                <b>Bên B (Đơn vị thi công)</b>
                <p></p>
                <p>CÔNG TY ĐIỆN CẦN THƠ</p>
                <p>
                  Địa chỉ trụ sở: Phường Xuân Khánh,Quận Ninh Kiểu, TP.Cần Thơ
                </p>
                <p>
                  Người đại
                  diện:..........................................................
                  Chúc
                  danh:.....................................................
                </p>
                <p>
                  Số chứng minh
                  thư/CCCD:..................................................................................................................
                </p>
                <p>
                  Số điện
                  thoại:.........................................................................................................................................
                </p>
                <p>
                  Hai bên thống nhất ký hợp đồng thi công lắp đặt với các điều
                  khoản sau:
                </p>
                <b>Điều 1: Địa điểm, hạng mục thi công, tiến độ thi công</b>
                <p></p>
                <p>
                  1. Địa điểm thi công: {item.numberHouse}, {item.road},{" "}
                  {item.ward}, {item.district}, TP.Cần Thơ
                </p>
                <p>
                  2. Hạng mục thi công: Lắp đặt toàn bộ hệ thống điện trong công
                  trình.
                </p>
                <p>
                  3. Tiến độ thi công: Công trình được thi công và hoàn thành
                  trong vòng 30 ngày kể từ ngày ký hợp đồng.
                </p>

                <b>Điều 2: Nghĩa vụ mỗi bên</b>
                <p></p>
                <b>Quyền và nghĩa vụ bên A</b>
                <p></p>
                <p>
                  1. Bên A có trách nhiệm giám sát tại công trình theo dõi chất
                  lượng vật liệu, chất lượng xây lắp, nếu thấy phần nào chưa đảm
                  bảo thì yêu cầu bên làm lại. Bên A có trách nhiemeh xác nhận
                  công tác phát sinh để làm cơ sở cho việc nghiệm thu và thanh
                  toán. Bên A xét thấy xâu lắp không đạt yêu câu được quyên
                  không ký vào biên bản nghiệm thu hoặc chưa nhận bàn giao.
                </p>
                <p>
                  2. Trách nhiệm của bên A phải: Bàn giao mặt bằng công trình,
                  Bàn giao mọi trang thiết bị cần thiết cho bên B.
                </p>
                <p></p>
                <b>Quyền và nghĩa vụ bên B</b>
                <p></p>
                <p>
                  1. Bên B phải chịu trách nhiệm chính về kỹ thuật và chất lượng
                  xây lắp toàn bộ công trình, bảo đảm thi công theo thiết kế phù
                  hợp với dự toán đã được duyệt, đúng quy trình, yêu cầu trong
                  xây dựng
                </p>
                <p>
                  2. Bên B muốn thay đổi loại vật liệu xây lắp nào hoặc thay đổi
                  phần thiết kế nào đều phải được sự chấp thuận của Bên A
                </p>
                <p>
                  3. Trách nhiệm của bên B: Quản lý thống nhất mặt bằng xây dựng
                  sau khi được giao, Tiếp nhận các loại vật liệu, vật tư, kỹ
                  thuật được bên A giao.
                </p>
                <p></p>
                <b>Diều 3: Nghiệm thu và bàn giao công trình</b>
                <p></p>
                <p>
                  1. Bên A có trách nhiệm thành lập và chủ trì hội đồng nghiệm
                  thu theo quy định của Nhà nước (có lập biên bản ghi rõ thành
                  phần).
                </p>
                <p>
                  2. Hội đồng nghiệm thu sẽ tiến hành nghiệm thu theo 4 đợt theo
                  từng khâu công việc chủ yếu, từng bộ phận, từng hạng mục công
                  trình và cuối cùng là toàn bộ công trình.
                </p>
                <p>
                  3. Bên B có trách nhiệm chuẩn bị các điều kiện cần thiêt để
                  nghiệm thu.
                </p>
                <p>
                  4. Sau khi nghiệm thực hiện xong việc nghiệm thu Bên B có
                  trách nghiệm bàn giao hạng mục công trình cùng với hồ sơ hoàn
                  thành công trình cho bên A
                </p>
                <b>Điều 4: Tạm ứng, thanh quyết toán</b>
                <p></p>
                <p>
                  1. Trong quá trình thi công, bên A sẽ tạm ứng bên B tương ứng
                  với khối lượng thực hiện nghiệm thu hàng tháng
                </p>

                <p>
                  2. Ngay sau khi hợp đồng nghiệm thu tổng thể công trình và đưa
                  vào sử dụng, hai bên căn cứ vào hợp đồng và các phụ lục hoặc
                  biên bản bổ sung để quyết toán và thanh lý hợp đồng.
                </p>
                <b>Điều 5: Trách nhiệm mỗi bên</b>
                <p></p>
                <p>
                  1. Nếu bên B không hoàn thành công trình đúng thời hạn hợp
                  đồng do nguyên nhân chủ quan thì bị
                  phạt....................giá trị hợp đồng
                </p>
                <p>
                  2. Nếu bên B không đảm bảo chất lượng xây lắp phải chịu bù đắp
                  mọi tổn thất do việc sữa chữa lại và phải chịu
                  phạt..................giá trị dự toán phần không đảm bảo chất
                  lượng
                </p>
                <b>Điều 6: Thủ tục giải quyết tranh chấp hợp đồng</b>
                <p></p>
                <p>
                  1. Hai bên cam kết thực hiện đúng các điều khoản ghi trong hợp
                  đồng này
                </p>
                <p>
                  2. Hai bên chủ động thông báo cho nhau biết tiến độ thực hiện
                  hợp đồng. Nếu có vấn đề bất lợi gì phát sinh các bên phải kịp
                  thời báo cho nhau biết và chủ động thương lượng giải quyết đảm
                  bảo có lợi cho cả hai
                </p>
                <b>Điều 7: Hiệu lực của hợp đồng</b>
                <p></p>
                <p>
                  Hợp đồng này có hiệu lực từ
                  ngày.......................................đến
                  ngày....................................... Hai bên sẽ tổ chức
                  họp và lập biên bản thanh lý hợp động vào ngày
                  .......................................
                </p>
                <p>
                  Hợp đồng này được lập thành 2 bản có giá trị như nhau, mỗi bên
                  giữ 1 bản.
                </p>
                <br />
              </div>
              <b>
                <t style={{ marginLeft: 150 }}>ĐẠI DIỆN BÊN A</t>
                <t style={{ marginLeft: 250 }}>ĐẠI DIỆN BÊN B</t>
              </b>

              <br />
              <t style={{ marginLeft: 150 }}>(ký tên, đóng dấu)</t>
              <t style={{ marginLeft: 250 }}>(ký tên đóng dấu)</t>
            </div>
          ))}
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </>
    );
  }
};

export default Print;
