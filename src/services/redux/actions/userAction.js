import * as ActionType from "./../constants/contants";
import Axios from "axios";
import Swal from "sweetalert2";

export const login = dataLogin => {
  return dispatch => {
    Axios({
      method: "POST",
      url: "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
      data: dataLogin.user
    })
      .then(result => {
        if (result.data.maLoaiNguoiDung === "KhachHang") {
          localStorage.setItem("User", JSON.stringify(result.data));
          if (dataLogin.preRequire) {
            dataLogin.history.replace({
              pathname: dataLogin.preRequire,
              prePage: dataLogin.prePage
            });
          } else {
            dataLogin.history.push("/");
          }
          dispatch({
            type: ActionType.LOGIN
          });
        } else {
          alert(
            "Đăng nhập thất bại!\nKhông thể dùng tài khoản Admin để đăng nhập."
          );
        }
      })
      .catch(err => {
        alert(err.response.data);
      });
  };
};

export const signUpAPI = payload => {
  payload.user.maLoaiNguoiDung = "KhachHang";
  payload.user.maNhom = "GP01";
  return dispatch => {
    Axios({
      method: "POST",
      url: "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
      data: payload.user
    })
      .then(result => {
        Swal.fire({
          icon: "success",
          title: "Đăng ký thành công!",
          text: "Đăng nhập ngay",
          width: "400px",
          padding: "0 0 20px 0"
        }).then(() => {
          payload.history.replace({
            pathname: "/login",
            preRequire: payload.preRequire,
            prePage: payload.prePage
          });
        });
        dispatch({
          type: ActionType.SIGN_UP
        });
      })
      .catch(err => {
        alert(err.response.data);
      });
  };
};
