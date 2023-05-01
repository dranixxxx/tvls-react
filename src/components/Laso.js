import React, { useState, useContext, useEffect } from "react";
import Context from '../context/Context';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Tooltip } from 'antd';
import ReactDOM from "react-dom";
import ThienBan from "./ThienBan";
//import Tooltip from '@material-ui/core/Tooltip';
import { computeDateToLunarDate } from "amlich.js"
import { convertLunar2Solar } from "../api/AmDuongLich"
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';

export default function Laso() {
  const { sao, setSao } = useContext(Context);
  const { loigiai, setLoigiai } = useContext(Context);
  var data = [
    { cungid: 1, sao: [], tamhop: [], cungten: "Tý", hanhcung: "hanhThuy", },
    { cungid: 2, sao: [], tamhop: [], cungten: "Sửu", hanhcung: "hanhTho", },
    { cungid: 3, sao: [], tamhop: [], cungten: "Dần", hanhcung: "hanhMoc", },
    { cungid: 4, sao: [], tamhop: [], cungten: "Mão", hanhcung: "hanhMoc", },
    { cungid: 5, sao: [], tamhop: [], cungten: "Thìn", hanhcung: "hanhTho", },
    { cungid: 6, sao: [], tamhop: [], cungten: "Tỵ", hanhcung: "hanhHoa", },
    { cungid: 7, sao: [], tamhop: [], cungten: "Ngọ", hanhcung: "hanhHoa", },
    { cungid: 8, sao: [], tamhop: [], cungten: "Mùi", hanhcung: "hanhTho", },
    { cungid: 9, sao: [], tamhop: [], cungten: "Thân", hanhcung: "hanhKim", },
    { cungid: 10, sao: [], tamhop: [], cungten: "Dậu", hanhcung: "hanhKim", },
    { cungid: 11, sao: [], tamhop: [], cungten: "Tuất", hanhcung: "hanhTho", },
    { cungid: 12, sao: [], tamhop: [], cungten: "Hợi", hanhcung: "hanhThuy", }]

  let [Chugiai, setChugiai] = useState([])

  const [ThapNhiCung, setThapNhiCung] = useState(data)
  const [ThongTin, setThongTin] = useState({ nam: null, thang: 0, ngay: null, gio: null, gioitinh: 1, timezone: 7, name: "", namxem: null, cuc: null, thiencan: null, diachi: null, nama: null, thanga: 1, ngaya: null, checked: false, thiencannamxem: null, diachinamxem: null })
  const [input, setInput] = useState({ hh: 0, dd: new Date().getDate(), mm: new Date().getMonth() + 1, yy: new Date().getFullYear(), sex: 1, timezone: 7, name: "", namxem: new Date().getFullYear(), checkbox: false })
  //set input vào time
  const onSetThongTin = (yy, mm, dd, hh, gioitinh, timezone, name, namxem, checked) => {
    setThongTin({
      nam: yy,
      thang: mm,
      ngay: dd,
      gio: hh,
      gioitinh: gioitinh,
      timezone: timezone,
      name: name,
      namxem: namxem,
      checked: checked
    });
  };

  function setActiveDate(nam, thang, ngay, gio, gioitinh, timezone, name, namxem, checked) {
    onSetThongTin(nam, thang, ngay, gio, gioitinh, timezone, name, namxem, checked);
  }

  const handleReset = (() => {
    for (var iii = 0; iii <= 11; iii++) {
      ThapNhiCung[iii].sao.splice(0, ThapNhiCung[iii].sao.length)
    }
    Chugiai = []
  })

  let doingay
  if (ThongTin.nam != null && input.checkbox === false) {
    //âm lịch
    doingay = computeDateToLunarDate(ThongTin.ngay, ThongTin.thang, ThongTin.nam, 7)
    //ThongTin.thiencan
    ThongTin.thiencan = (parseInt(doingay.lunarYear) + 7) % 10
    //ThongTin.diachi
    ThongTin.diachi = (parseInt(doingay.lunarYear) + 9) % 12
    ThongTin.nama = doingay.lunarYear
    ThongTin.ngaya = doingay.lunarDay
    ThongTin.thanga = doingay.lunarMonth
  }
  //đổi dương lịch
  if (ThongTin.nam != null && input.checkbox === true) {
    //dương lịch
    doingay = convertLunar2Solar(ThongTin.ngay, ThongTin.thang, ThongTin.nam, false, 7)
    //ThongTin.thiencan
    ThongTin.thiencan = (parseInt(ThongTin.nam) + 7) % 10
    //ThongTin.diachi
    ThongTin.diachi = (parseInt(ThongTin.nam) + 9) % 12
    ThongTin.nama = doingay.year
    ThongTin.ngaya = doingay.day
    ThongTin.thanga = doingay.month
  }

  // if (ThongTin.namxem != null){
  //   ThongTin.thiencannamxem = (parseInt(ThongTin.namxem) + 7) % 10
  //   ThongTin.diachinamxem  = (parseInt(ThongTin.namxem) + 9) % 12
  // }

  if (ThongTin.diachi === 0) {
    ThongTin.diachi = 12;
  }
  if (ThongTin.thiencan === 0) {
    ThongTin.thiencan = 10;
  }
  var tc = parseInt(ThongTin.thiencan);//thiên can
  var dc = parseInt(ThongTin.diachi);//địa chi
  let tt, nn;
  if (input.checkbox === false) {
    tt = parseInt(ThongTin.thanga)//tháng
    nn = parseInt(ThongTin.ngaya);//ngày
  }
  //đổi dương lịch
  if (input.checkbox === true) {
    tt = parseInt(ThongTin.thang)//tháng
    nn = parseInt(ThongTin.ngay);//ngày
  }
  var timezone = parseInt(ThongTin.timezone)
  var hh = parseInt(1.5 + ThongTin.gio / 2);//giờ toán tử cuối là giờ sinh theo 24h
  var gioitinh = parseInt(ThongTin.gioitinh)//gioitinh
  var cungchu = [{ cungchu: "Mệnh" }, { cungchu: "Phụ mẫu" }, { cungchu: "Phúc đức" }, { cungchu: "Điền trạch" }, { cungchu: "Quan lộc" }, { cungchu: "Nô bộc" }, { cungchu: "Thiên di" }, { cungchu: "Tật ách" }, { cungchu: "Tài bạch" }, { cungchu: "Tử tức" }, { cungchu: "Phu thê" }, { cungchu: "Huynh đệ" }]
  var cungthan = [{ cungthan: "Thân" }, { cungthan: "" }, { cungthan: "" }, { cungthan: "" }, { cungthan: "" }, { cungthan: "" }, { cungthan: "" }, { cungthan: "" }, { cungthan: "" }, { cungthan: "" }, { cungthan: "" }, { cungthan: "" }]
  var timdaihan = [{ daihan: ThongTin.cuc }, { daihan: ThongTin.cuc + 10 }, { daihan: ThongTin.cuc + 20 }, { daihan: ThongTin.cuc + 30 }, { daihan: ThongTin.cuc + 40 }, { daihan: ThongTin.cuc + 50 }, { daihan: ThongTin.cuc + 60 }, { daihan: ThongTin.cuc + 70 }, { daihan: ThongTin.cuc + 80 }, { daihan: ThongTin.cuc + 90 }, { daihan: ThongTin.cuc + 100 }, { daihan: ThongTin.cuc + 110 },]
  var timtieuhan = [{ tieuhan: "Tý" }, { tieuhan: "Sửu" }, { tieuhan: "Dần" }, { tieuhan: "Mão" }, { tieuhan: "Thìn" }, { tieuhan: "Tỵ" }, { tieuhan: "Ngọ" }, { tieuhan: "Mùi" }, { tieuhan: "Thân" }, { tieuhan: "Dậu" }, { tieuhan: "Tuất" }, { tieuhan: "Hợi" }]
  var timnguyethan = [{ nguyethan: "tháng 1" }, { nguyethan: "tháng 2" }, { nguyethan: "tháng 3" }, { nguyethan: "tháng 4" }, { nguyethan: "tháng 5" }, { nguyethan: "tháng 6" }, { nguyethan: "tháng 7" }, { nguyethan: "tháng 8" }, { nguyethan: "tháng 9" }, { nguyethan: "tháng 10" }, { nguyethan: "tháng 11" }, { nguyethan: "tháng 12" },]
  //cần sửa
  var matranNapAm = [
    [0, "G", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Qúy"],
    [1, 4, 0, 2, 0, 6, 0, 5, 0, 3, 0],
    [2, 0, 4, 0, 2, 0, 6, 0, 5, 0, 3],
    [3, 2, 0, 6, 0, 5, 0, 3, 0, 4, 0],
    [4, 0, 2, 0, 6, 0, 5, 0, 3, 0, 4],
    [5, 6, 0, 5, 0, 3, 0, 4, 0, 2, 0],
    [6, 0, 6, 0, 5, 0, 3, 0, 4, 0, 2],
    [7, 4, 0, 2, 0, 6, 0, 5, 0, 3, 0],
    [8, 0, 4, 0, 2, 0, 6, 0, 5, 0, 3],
    [9, 2, 0, 6, 0, 5, 0, 3, 0, 4, 0],
    [10, 0, 2, 0, 6, 0, 5, 0, 3, 0, 4],
    [11, 6, 0, 5, 0, 3, 0, 4, 0, 2, 0],
    [12, 0, 6, 0, 5, 0, 3, 0, 4, 0, 2]
  ];
  //âm dương can chi năm sinh
  let amduongthiencan, amduongdiachi
  if (tc % 2 === 1) {
    amduongthiencan = 1
  }
  else {
    amduongthiencan = -1
  }
  // if (dc % 2 === 1){
  //     amduongdiachi = 1
  // }
  // else{
  //     amduongdiachi = -1
  // }
  //tìm tiểu hạn
  let khoitieuhan
  let khoinguyethan
  //năm xem
  var dcnamxem = (ThongTin.namxem + 9) % 12
  var tcnamxem = (ThongTin.namxem + 7) % 10
  if (gioitinh === 1) {
    khoitieuhan = [0, 2, 6, 10, 2, 6, 10, 2, 6, 10, 2, 6, 10,]
    khoinguyethan = 12 + khoitieuhan[dc] - (dcnamxem - 1)
  }
  if (gioitinh === -1) {
    khoitieuhan = [0, 10, 8, 6, 4, 2, 0, 10, 8, 6, 4, 2, 0,]
    let xxx = [0, 8, 12, 4, 8, 12, 4, 8, 12, 4, 8, 12, 4]
    khoinguyethan = xxx[dc] + 12 + khoitieuhan[dc] - (dcnamxem - 1)
  }

  ///////////
  for (var a = 0; a < ThapNhiCung.length; a++) {
    //công thức tính cung mệnh(+1 do js array tính từ 0)
    var b = (a - 2 - tt + hh + 12) % 12
    ThapNhiCung[a] = { ...ThapNhiCung[a], ...cungchu[b] }
    //công thức tính cung thân(-1 do js array tính từ 0)
    var c = (a - tt - hh + 24) % 12
    ThapNhiCung[a] = { ...ThapNhiCung[a], ...cungthan[c] }
    //tìm đại hạn
    ThapNhiCung[a] = { ...ThapNhiCung[a], ...timdaihan[(b * gioitinh * amduongthiencan + 12) % 12] }
    //tìm tiểu hạn
    ThapNhiCung[a] = { ...ThapNhiCung[a], ...timtieuhan[(a * gioitinh + 12 + khoitieuhan[dc]) % 12] }
    //tìm nguyệt hạn
    ThapNhiCung[a] = { ...ThapNhiCung[a], ...timnguyethan[(a + khoinguyethan + tt - hh) % 12] }
  }

  //timcuc
  var vitricungmenh = (3 + tt - hh + 12) % 12;
  var canthanggieng = (tc * 2 + 1) % 10;
  var canthangmenh = (((vitricungmenh - 3 + 12) % 12) + canthanggieng) % 10;
  if (vitricungmenh === 0) {
    vitricungmenh = 12;
  }
  if (canthangmenh === 0) {
    canthangmenh = 10;
  }
  ThongTin.cuc = matranNapAm[vitricungmenh][canthangmenh]
  //tìm tử vi
  var bb = parseInt(nn / ThongTin.cuc) + 1
  if (nn % ThongTin.cuc === 0) {
    bb = nn / ThongTin.cuc
  }
  var aa = bb * ThongTin.cuc - nn
  if (aa % 2 === 1) {
    aa = -aa
  }
  // tìm tử vi
  var timTuvi = (1 + bb + aa + 12) % 12
  //ma trân đặc tính đắc hãm của sao
  var maTranDacTinh = {
    1: ["(B)", "(Đ)", "(M)", "(B)", "(V)", "(M)", "(M)", "(Đ)", "(M)", "(B)", "(V)", "(B)"],
    2: ["(V)", "(Đ)", "(V)", "(H)", "(M)", "(H)", "(V)", "(Đ)", "(V)", "(H)", "(M)", "(H)"],
    3: ["(V)", "(H)", "(M)", "(Đ)", "(H)", "(Đ)", "(H)", "(H)", "(M)", "(H)", "(H)", "(Đ)"],
    4: ["(V)", "(M)", "(V)", "(Đ)", "(M)", "(H)", "(V)", "(M)", "(V)", "(Đ)", "(M)", "(H)"],
    5: ["(H)", "(Đ)", "(V)", "(V)", "(V)", "(M)", "(M)", "(Đ)", "(H)", "(H)", "(H)", "(H)"],
    6: ["(Đ)", "(Đ)", "(H)", "(M)", "(M)", "(V)", "(Đ)", "(Đ)", "(V)", "(M)", "(M)", "(H)"],
    7: ["(V)", "(B)", "(M)", "(B)", "(V)", "(V)", "(V)", "(B)", "(M)", "(B)", "(V)", "(B)"],
    8: ["(V)", "(Đ)", "(H)", "(H)", "(H)", "(H)", "(H)", "(Đ)", "(V)", "(M)", "(M)", "(M)"],
    9: ["(H)", "(M)", "(Đ)", "(H)", "(V)", "(H)", "(H)", "(M)", "(Đ)", "(H)", "(V)", "(H)"],
    10: ["(V)", "(H)", "(V)", "(M)", "(H)", "(H)", "(V)", "(H)", "(Đ)", "(M)", "(H)", "(Đ)"],
    11: ["(V)", "(Đ)", "(M)", "(H)", "(V)", "(Đ)", "(V)", "(Đ)", "(M)", "(H)", "(V)", "(Đ)"],
    12: ["(V)", "(Đ)", "(V)", "(V)", "(M)", "(H)", "(M)", "(Đ)", "(V)", "(H)", "(M)", "(H)"],
    13: ["(M)", "(Đ)", "(M)", "(H)", "(H)", "(V)", "(M)", "(Đ)", "(M)", "(H)", "(H)", "(V)"],
    14: ["(M)", "(V)", "(H)", "(H)", "(Đ)", "(H)", "(M)", "(V)", "(H)", "(H)", "(Đ)", "(H)"],

    19: [null, null, "(Đ)", "(Đ)", null, null, null, null, "(Đ)", "(Đ)", null, null],//tiểu hao
    25: [null, null, "(Đ)", "(Đ)", null, null, null, null, "(Đ)", "(Đ)", null, null],//đại hao
    55: ["(H)", "(Đ)", "(H)", "(H)", "(Đ)", "(H)", "(H)", "(Đ)", "(H)", "(H)", "(Đ)", "(H)"],//đà la
    56: ["(H)", "(Đ)", "(H)", "(H)", "(Đ)", "(H)", "(H)", "(Đ)", "(H)", "(H)", "(Đ)", "(H)"],//kình dương
    57: ["(H)", "(H)", "(Đ)", "(H)", "(H)", "(Đ)", "(H)", "(H)", "(Đ)", "(H)", "(H)", "(Đ)"],//địa không
    58: ["(H)", "(H)", "(Đ)", "(H)", "(H)", "(Đ)", "(H)", "(H)", "(Đ)", "(H)", "(H)", "(Đ)"],//địa kiếp
    59: ["(H)", "(H)", "(Đ)", "(Đ)", "(Đ)", "(Đ)", "(Đ)", "(H)", "(H)", "(H)", "(H)", "(H)"],//linh tinh
    60: ["(H)", "(H)", "(Đ)", "(Đ)", "(Đ)", "(Đ)", "(Đ)", "(H)", "(H)", "(H)", "(H)", "(H)"],//hỏa linh
    61: ["(H)", "(Đ)", "(H)", "(Đ)", "(H)", "(Đ)", "(H)", "(Đ)", "(H)", "(H)", "(Đ)", "(Đ)"],//văn khúc
    62: ["(H)", "(Đ)", "(H)", "(Đ)", "(H)", "(Đ)", "(H)", "(Đ)", "(H)", "(H)", "(Đ)", "(Đ)"],//văn xương
    74: ["(Đ)", "(Đ)", null, "(Đ)", null, null, "(Đ)", "(Đ)", null, "(Đ)", null, null],
    75: ["(Đ)", "(Đ)", null, "(Đ)", null, null, "(Đ)", "(Đ)", null, "(Đ)", null, null],
    76: [null, null, "(Đ)", "(Đ)", null, null, null, null, "(Đ)", "(Đ)", null, null],
    77: [null, null, "(Đ)", "(Đ)", null, null, null, null, null, "(Đ)", "(Đ)", null],
    96: [null, null, "(Đ)", null, null, "(Đ)", null, null, null, null, null, null],
    107: [null, "(Đ)", null, null, "(Đ)", null, null, "(Đ)", null, null, "(Đ)", null],
  }
  var locton = [0, 2, 3, 5, 6, 5, 6, 8, 9, 11]
  var khoiviet = [3, 1, 0, 11, 11, 1, 0, 6, 6, 3]
  var timcoqua = [2, 2, 5, 5, 5, 8, 8, 8, 11, 11, 11, 2]
  var timthienma = [11, 8, 5, 2, 11, 8, 5, 2, 11, 8, 5, 2]
  var timphatoai = [1, 9, 5, 1, 9, 5, 1, 9, 5, 1, 9, 5]
  var timthienquan = [6, 7, 4, 5, 2, 3, 9, 11, 9, 10]
  var timthienphuc = [5, 9, 8, 0, 11, 3, 2, 6, 5, 6]
  var timluuha = [2, 9, 10, 7, 8, 5, 6, 4, 3, 11]
  var timthientru = [10, 5, 6, 0, 5, 6, 8, 2, 6, 9]
  var timtriet = [1, 9, 7, 5, 3, 1, 9, 7, 5, 3]
  //tìm tràng sinh
  let timtrangsinh;
  if (ThongTin.cuc === 6) {
    timtrangsinh = 2;
  }
  if (ThongTin.cuc === 4) {
    timtrangsinh = 5;
  }
  if (ThongTin.cuc === 2 || ThongTin.cuc === 5) {
    timtrangsinh = 8;
  }
  if (ThongTin.cuc === 3) {
    timtrangsinh = 11;
  }
  //tìm hỏa linh
  let timhoatinh;
  let timlinhtinh;
  if (dc === 3 || dc === 7 || dc === 11) {
    timhoatinh = 1;
    timlinhtinh = 3;
  }
  if (dc === 1 || dc === 5 || dc === 9) {
    timhoatinh = 2;
    timlinhtinh = 10;
  }
  if (dc === 6 || dc === 10 || dc === 2) {
    timhoatinh = 3;
    timlinhtinh = 10;
  }
  if (dc === 12 || dc === 4 || dc === 8) {
    timhoatinh = 9;
    timlinhtinh = 10;
  }
  //an tứ hóa
  let khoa, quyen, loc, ky
  if (tc === 1) {
    loc = (timTuvi + 4) % 12//liêm
    quyen = (13 + 3 - timTuvi + 10) % 12//phá
    khoa = (timTuvi + 8) % 12//vũ
    ky = (timTuvi + 9) % 12//dương
  } if (tc === 2) {
    loc = (timTuvi + 11) % 12//cơ
    quyen = (13 + 3 - timTuvi + 5) % 12//lương
    khoa = timTuvi % 12//vi
    ky = (13 + 3 - timTuvi + 1) % 12//âm
  } if (tc === 3) {
    loc = (timTuvi + 7) % 12//đồng
    quyen = (timTuvi + 11) % 12//cơ
    khoa = (11 + 12 - hh) % 12//xương
    ky = (timTuvi + 4) % 12//liêm
  } if (tc === 4) {
    loc = (13 + 3 - timTuvi + 1) % 12//âm
    quyen = (timTuvi + 7) % 12//đồng
    khoa = (timTuvi + 11) % 12//cơ
    ky = (13 + 3 - timTuvi + 3) % 12//cự
  } if (tc === 5) {
    loc = (13 + 3 - timTuvi + 2) % 12//tham
    quyen = (13 + 3 - timTuvi + 1) % 12//âm
    khoa = (10 - tt + 1 + 12) % 12//hữu
    ky = (timTuvi + 11) % 12//cơ
  } if (tc === 6) {
    loc = (timTuvi + 8) % 12//vũ
    quyen = (13 + 3 - timTuvi + 2) % 12//tham
    khoa = (13 + 3 - timTuvi + 5) % 12//lương
    ky = (3 + hh) % 12//khúc
  } if (tc === 7) {
    loc = (timTuvi + 9) % 12//dương
    quyen = (timTuvi + 8) % 12//vũ
    khoa = (13 + 3 - timTuvi + 1) % 12//âm
    ky = (timTuvi + 7) % 12//đồng
  } if (tc === 8) {
    loc = (13 + 3 - timTuvi + 3) % 12//cự
    quyen = (timTuvi + 9) % 12//dương
    khoa = (3 + hh) % 12//khúc
    ky = (11 + 12 - hh) % 12//xương
  } if (tc === 9) {
    loc = (13 + 3 - timTuvi + 5) % 12//lương
    quyen = timTuvi % 12//vi
    khoa = (13 + 3 - timTuvi) % 12//phủ
    ky = (timTuvi + 8) % 12//vũ
  } if (tc === 10) {
    loc = (13 + 3 - timTuvi + 10) % 12//phá
    quyen = (13 + 3 - timTuvi + 3) % 12//cự
    khoa = (13 + 3 - timTuvi + 1) % 12//âm
    ky = (13 + 3 - timTuvi + 2) % 12//tham
  }

  //an sao
  if (sao != null && ThongTin.diachi != null) {
    //an bắc đẩu tinh
    ThapNhiCung[timTuvi % 12].sao.push(sao[0]);//1tử vi
    ThapNhiCung[(timTuvi + 4) % 12].sao.push(sao[1]);//2liêm trinh
    ThapNhiCung[(timTuvi + 7) % 12].sao.push(sao[2]);//3thiên đồng
    ThapNhiCung[(timTuvi + 8) % 12].sao.push(sao[3]);//4vũ khúc
    ThapNhiCung[(timTuvi + 9) % 12].sao.push(sao[4]);//5thái dương
    ThapNhiCung[(timTuvi + 11) % 12].sao.push(sao[5]);//6thiên cơ
    ThapNhiCung[(13 + 3 - timTuvi) % 12].sao.push(sao[6]);//7thiên phủ
    ThapNhiCung[(13 + 3 - timTuvi + 1) % 12].sao.push(sao[7]);//8thái âm
    ThapNhiCung[(13 + 3 - timTuvi + 2) % 12].sao.push(sao[8]);//9tham lang
    ThapNhiCung[(13 + 3 - timTuvi + 3) % 12].sao.push(sao[9]);//10cự môn
    ThapNhiCung[(13 + 3 - timTuvi + 4) % 12].sao.push(sao[10]);//11thiên tướng
    ThapNhiCung[(13 + 3 - timTuvi + 5) % 12].sao.push(sao[11]);//12thiên lương
    ThapNhiCung[(13 + 3 - timTuvi + 6) % 12].sao.push(sao[12]);//13thất sát
    ThapNhiCung[(13 + 3 - timTuvi + 10) % 12].sao.push(sao[13]);//14phá quân
    //an vòng lộc tồn
    var y = tc % 10
    var amduongnamnu = gioitinh * amduongthiencan
    ThapNhiCung[locton[y]].sao.push(sao[14]);//27
    ThapNhiCung[locton[y]].sao.push(sao[15]);//28
    //âm nam dương nữ lấy +-1 nên lấy +12
    ThapNhiCung[(locton[y] + 12 + 1 * amduongnamnu) % 12].sao.push(sao[16]);//29
    ThapNhiCung[(locton[y] + 12 + 2 * amduongnamnu) % 12].sao.push(sao[17]);//30
    ThapNhiCung[(locton[y] + 12 + 3 * amduongnamnu) % 12].sao.push(sao[18]);//31
    ThapNhiCung[(locton[y] + 12 + 4 * amduongnamnu) % 12].sao.push(sao[19]);//32
    ThapNhiCung[(locton[y] + 12 + 5 * amduongnamnu) % 12].sao.push(sao[20]);//33
    ThapNhiCung[(locton[y] + 12 + 6 * amduongnamnu) % 12].sao.push(sao[21]);//34
    ThapNhiCung[(locton[y] + 12 + 7 * amduongnamnu) % 12].sao.push(sao[22]);//35
    ThapNhiCung[(locton[y] + 12 + 8 * amduongnamnu) % 12].sao.push(sao[23]);//36
    ThapNhiCung[(locton[y] + 12 + 9 * amduongnamnu) % 12].sao.push(sao[24]);//37
    ThapNhiCung[(locton[y] + 12 + 10 * amduongnamnu) % 12].sao.push(sao[25]);//38
    ThapNhiCung[(locton[y] + 12 + 11 * amduongnamnu) % 12].sao.push(sao[26]);//39
    //an vòng thái tuế
    var x = ThapNhiCung.findIndex(obj => obj.cungid === dc)
    ThapNhiCung[x % 12].sao.push(sao[27]);//15
    ThapNhiCung[(x + 1) % 12].sao.push(sao[28]);//16
    ThapNhiCung[(x + 1) % 12].sao.push(sao[29]);//16thiên không
    ThapNhiCung[(x + 2) % 12].sao.push(sao[30]);//17
    ThapNhiCung[(x + 3) % 12].sao.push(sao[31]);//18
    ThapNhiCung[(x + 4) % 12].sao.push(sao[32]);//19
    ThapNhiCung[(x + 5) % 12].sao.push(sao[33]);//20
    ThapNhiCung[(x + 5) % 12].sao.push(sao[34]);//73nguyệt đức
    ThapNhiCung[(x + 6) % 12].sao.push(sao[35]);//21
    ThapNhiCung[(x + 7) % 12].sao.push(sao[36]);//22
    ThapNhiCung[(x + 8) % 12].sao.push(sao[37]);//23
    ThapNhiCung[(x + 9) % 12].sao.push(sao[38]);//24
    ThapNhiCung[(x + 9) % 12].sao.push(sao[39]);//thiên đức
    ThapNhiCung[(x + 10) % 12].sao.push(sao[40]);//25
    ThapNhiCung[(x + 11) % 12].sao.push(sao[41]);//26
    //an vòng tràng sinh
    ThapNhiCung[timtrangsinh].sao.push(sao[42]);//40
    ThapNhiCung[(timtrangsinh + 12 + 1 * amduongnamnu) % 12].sao.push(sao[43]);//41
    ThapNhiCung[(timtrangsinh + 12 + 2 * amduongnamnu) % 12].sao.push(sao[44]);//42
    ThapNhiCung[(timtrangsinh + 12 + 3 * amduongnamnu) % 12].sao.push(sao[45]);//43
    ThapNhiCung[(timtrangsinh + 12 + 4 * amduongnamnu) % 12].sao.push(sao[46]);//44
    ThapNhiCung[(timtrangsinh + 12 + 5 * amduongnamnu) % 12].sao.push(sao[47]);//45
    ThapNhiCung[(timtrangsinh + 12 + 6 * amduongnamnu) % 12].sao.push(sao[48]);//46
    ThapNhiCung[(timtrangsinh + 12 + 7 * amduongnamnu) % 12].sao.push(sao[49]);//47
    ThapNhiCung[(timtrangsinh + 12 + 8 * amduongnamnu) % 12].sao.push(sao[50]);//48
    ThapNhiCung[(timtrangsinh + 12 + 9 * amduongnamnu) % 12].sao.push(sao[51]);//49
    ThapNhiCung[(timtrangsinh + 12 + 10 * amduongnamnu) % 12].sao.push(sao[52]);//50
    ThapNhiCung[(timtrangsinh + 12 + 11 * amduongnamnu) % 12].sao.push(sao[53]);//51
    //an lục sát
    ThapNhiCung[(locton[y] + 12 + 11) % 12].sao.push(sao[54]);//52
    ThapNhiCung[(locton[y] + 12 + 1) % 12].sao.push(sao[55]);//53
    ThapNhiCung[(24 - hh) % 12].sao.push(sao[56]);//55
    ThapNhiCung[(hh + 10) % 12].sao.push(sao[57]);//54
    //cần an lại hỏa linh
    ThapNhiCung[(timlinhtinh + amduongnamnu * (1 - hh) + 12) % 12].sao.push(sao[58]);//56
    ThapNhiCung[(timhoatinh + amduongnamnu * (hh - 1) + 12) % 12].sao.push(sao[59]);//57
    //an lục cát
    ThapNhiCung[(3 + hh) % 12].sao.push(sao[60]);//văn khúc59
    ThapNhiCung[(11 + 12 - hh) % 12].sao.push(sao[61]);//văn xương58
    ThapNhiCung[(3 + 5 - khoiviet[y] + 12) % 12].sao.push(sao[62]);//61
    ThapNhiCung[khoiviet[y]].sao.push(sao[63]);//60
    ThapNhiCung[(4 + tt - 1) % 12].sao.push(sao[64]);//62
    ThapNhiCung[(10 - tt + 1 + 12) % 12].sao.push(sao[65]);//63
    //an long phượng
    ThapNhiCung[(3 + dc) % 12].sao.push(sao[66]);//64
    ThapNhiCung[(11 + 12 - dc) % 12].sao.push(sao[67]);//65
    ThapNhiCung[(11 + 12 - dc) % 12].sao.push(sao[68]);//84 giải thần
    //an thai tọa
    ThapNhiCung[(4 + tt + nn - 2) % 12].sao.push(sao[69]);//66
    ThapNhiCung[(12 - tt - nn + 36) % 12].sao.push(sao[70]);//67
    //an quang quý
    ThapNhiCung[(11 + 12 - hh + nn - 2) % 12].sao.push(sao[71]);//68
    ThapNhiCung[(3 + hh + 12 - nn + 2 + 36) % 12].sao.push(sao[72]);//69
    //an khốc hư
    ThapNhiCung[(5 - x + 1 + 12) % 12].sao.push(sao[73]);//70
    ThapNhiCung[(7 + x - 1) % 12].sao.push(sao[74]);//71
    //an hình riêu y
    ThapNhiCung[(8 + tt) % 12].sao.push(sao[75]);//74
    ThapNhiCung[tt % 12].sao.push(sao[76]);//75
    ThapNhiCung[tt % 12].sao.push(sao[77]);//76
    //an quốc ấn đường phù
    ThapNhiCung[(locton[y] + 12 + 8) % 12].sao.push(sao[78]);//77
    ThapNhiCung[(locton[y] + 12 + 5) % 12].sao.push(sao[79]);//78
    //an đào hồng hỷ
    ThapNhiCung[(timthienma[(x - 1 + 12) % 12] + 7) % 12].sao.push(sao[80]);//79
    ThapNhiCung[(4 - dc + 12) % 12].sao.push(sao[81]);//80
    ThapNhiCung[(10 - dc + 12) % 12].sao.push(sao[82]);//81
    //an cáo phụ
    ThapNhiCung[(3 + hh + 2) % 12].sao.push(sao[83]);//85
    ThapNhiCung[(3 + hh + -2) % 12].sao.push(sao[84]);//86
    //an thiên giải địa giải
    ThapNhiCung[(8 + tt - 1) % 12].sao.push(sao[85]);//82
    ThapNhiCung[(4 + tt - 1 + 3) % 12].sao.push(sao[86]);//83
    //an thiên tài thiên thọ
    ThapNhiCung[(2 + tt - hh + 12 + dc - 1) % 12].sao.push(sao[87]);//83
    ThapNhiCung[(tt + hh + dc - 1) % 12].sao.push(sao[88]);
    //an thiên quan thiên phúc
    ThapNhiCung[timthienquan[y]].sao.push(sao[89]);//102
    ThapNhiCung[timthienphuc[y]].sao.push(sao[90]);//103
    //an cô thần quả tú
    ThapNhiCung[timcoqua[x]].sao.push(sao[91]);//98
    ThapNhiCung[(timcoqua[x] + 8) % 12].sao.push(sao[92]);//99
    //an thiên la địa võng
    ThapNhiCung[4].sao.push(sao[93]);//92
    ThapNhiCung[10].sao.push(sao[94]);//93
    //an thiên mã
    ThapNhiCung[timthienma[(x - 1 + 12) % 12]].sao.push(sao[95]);//100
    //an phá toái
    ThapNhiCung[timphatoai[(x - 1 + 12) % 12]].sao.push(sao[96]);//101
    //an văn tinh đẩu quân
    ThapNhiCung[(locton[y] + 12 + 3) % 12].sao.push(sao[97]);//108
    ThapNhiCung[(dc - tt + hh + 12 - 1) % 12].sao.push(sao[98]);//109
    //an thiên thương thiên sứ
    ThapNhiCung[(2 + tt - hh + 12 + 5) % 12].sao.push(sao[99]);//90
    ThapNhiCung[(2 + tt - hh + 12 + 7) % 12].sao.push(sao[100]);//91
    //an kiếp sát hoa cái
    ThapNhiCung[(timthienma[(x - 1 + 12) % 12] + 3) % 12].sao.push(sao[101]);//106
    ThapNhiCung[(timthienma[(x - 1 + 12) % 12] + 2) % 12].sao.push(sao[102]);//107
    //an tứ hóa
    ThapNhiCung[loc].sao.push(sao[103]);//106
    ThapNhiCung[quyen].sao.push(sao[104]);//107
    ThapNhiCung[khoa].sao.push(sao[105]);//106
    ThapNhiCung[ky].sao.push(sao[106]);//107
    //an lưu hà thiên trù
    ThapNhiCung[timluuha[y]].sao.push(sao[107]);//104
    ThapNhiCung[timthientru[y]].sao.push(sao[108]);//105
    //an tuần triệt
    ThapNhiCung[(dc + 10 - tc) % 12].sao.push(sao[109]);//104
    ThapNhiCung[(dc + 10 - tc + 1) % 12].sao.push(sao[109]);
    ThapNhiCung[timtriet[y] - 1].sao.push(sao[110]);//104
    ThapNhiCung[timtriet[y]].sao.push(sao[110]);//104
    //an sao lưu
    var xx = ThapNhiCung.findIndex(obj => obj.cungid === dcnamxem)
    var yy = tcnamxem % 10
    ThapNhiCung[xx % 12].sao.push(sao[111]);
    ThapNhiCung[(xx + 2) % 12].sao.push(sao[112]);
    ThapNhiCung[(xx + 8) % 12].sao.push(sao[113]);
    ThapNhiCung[(5 - xx + 1 + 12) % 12].sao.push(sao[114]);
    ThapNhiCung[(7 + xx - 1) % 12].sao.push(sao[115]);
    ThapNhiCung[locton[yy]].sao.push(sao[116]);
    ThapNhiCung[(locton[yy] + 12 + 1) % 12].sao.push(sao[117]);
    ThapNhiCung[(locton[yy] + 12 + 11) % 12].sao.push(sao[118]);
    ThapNhiCung[timthienma[(xx - 1 + 12) % 12]].sao.push(sao[119]);
  }

  //kiểm tra trùng sao
  for (var ii = 0; ii <= 11; ii++) {
    ThapNhiCung[ii].sao = [...new Map(ThapNhiCung[ii].sao.map(item => [item.id, item])).values()]
  }

  // const showChugiai = () => (
  //   <div>
  //     <div>Lời giải</div>
  //     {Chugiai.map((b) =>
  //       <>
  //         <div>- {b.name}</div>
  //         <div>{b.description}</div>
  //       </>
  //     )}
  //   </div>
  // );

  async function lapDiaBan() {
    console.log(ThapNhiCung)
    await handleReset()
    await setActiveDate(parseInt(input.yy), parseInt(input.mm), parseInt(input.dd), input.hh, input.sex, parseInt(input.timezone), input.name, parseInt(input.namxem), input.checkbox)
    for (var i = 0; i <= 11; i++) {
      let DacTinh
      //lấy id sao cung tam hợp
      ThapNhiCung[i].tamhop = [...ThapNhiCung[i].sao.map(a => a.id), ...ThapNhiCung[(i + 4) % 12].sao.filter(x => x.saoloai !== 'chinhtinh').map(a => a.id), ...ThapNhiCung[(i + 8) % 12].sao.filter(x => x.saoloai !== 'chinhtinh').map(a => a.id), ...ThapNhiCung[(i + 6) % 12].sao.map(a => a.id)]
      //render các cung
      ReactDOM.render(
        <>
          <div className="grid cung-top">
            <div className={"col col-2 tooltips " + ThapNhiCung[i].hanhcung} title={"Địa chi cung " + ThapNhiCung[i].cungten}>{ThapNhiCung[i].cungten}</div>
            <div className="col col-8">
              <span className="cungChu">
                {ThapNhiCung[i].cungchu + " "}
              </span>
              <span className={"cungThan " + ThapNhiCung[i].cungthan}>
                {ThapNhiCung[i].cungthan}
              </span>
            </div>
            <div className="col col-2 tooltips" title={"Đại hạn " + (ThapNhiCung[i].daihan)}>{(ThapNhiCung[i].daihan)}</div>
          </div>
          <div className="grid cung-middle">
            <div className="chinhTinh">
              {ThapNhiCung[i].sao.filter(x => x.saoloai === 'chinhtinh').map((a) => {
                DacTinh = loigiai.filter(x => x.saos.every(y => ThapNhiCung[i].tamhop.includes(y.id)) &&
                  x.saos.some(y => y.id === a.id) &&
                  x.cungs.some(y => y.name === ThapNhiCung[i].cungchu) &&
                  //x.lucthans.every(y =>[i+1].includes(y.id))
                  x.lucthans.some(y => y.name === ThapNhiCung[i].cungten)
                )
                Chugiai.push(...DacTinh)
                return (
                  <Tooltip placement="right"
                    title={
                      <React.Fragment>
                        {DacTinh.map((b) =>
                          <>
                            <div>- {b.name}</div>
                            <div>{b.description}</div>
                          </>
                        )}
                      </React.Fragment>
                    }>
                    <li className={a.csssao}>{a.name} {maTranDacTinh[a.id][i]}</li>
                  </Tooltip>
                )
              })}
            </div>
            <div className="phuTinh">
              <div className="saotot">
                {ThapNhiCung[i].sao.filter(x => x.saoloai === 'saotot' || x.saoloai === 'cattinh' || x.saoloai === 'quytinh' || x.saoloai === 'phuctinh').map((at) => {
                  DacTinh = loigiai.filter(x => x.saos.every(y => ThapNhiCung[i].tamhop.includes(y.id)) &&
                    x.saos.some(y => y.id === at.id) &&
                    x.cungs.some(y => y.name === ThapNhiCung[i].cungchu)
                    //x.lucthans.every(y =>[6].includes(y.id))
                  )
                  Chugiai.push(...DacTinh)
                  if (Object.keys(maTranDacTinh).some(mt => parseInt(mt) === at.id)) {
                    return (
                      <Tooltip placement="right"
                        title={
                          <React.Fragment>
                            {DacTinh.map((b) =>
                              <>
                                <div>- {b.name}</div>
                                <div>{b.description}</div>
                              </>
                            )}
                          </React.Fragment>
                        }>
                        <div className={at.csssao}>{at.name} {maTranDacTinh[at.id][i]}</div>
                      </Tooltip>
                    )
                  }
                  else return (
                    <Tooltip placement="right"
                      title={
                        <React.Fragment>
                          {DacTinh.map((b) =>
                            <>
                              <div>- {b.name}</div>
                              <div>{b.description}</div>
                            </>
                          )}
                        </React.Fragment>
                      }>
                      <div className={at.csssao}>{at.name}</div>
                    </Tooltip>
                  )
                })}
                {ThapNhiCung[i].sao.filter(x => x.saoloai === 'luutot').map((atl) => {
                  DacTinh = loigiai.filter(x => x.saos.every(y => ThapNhiCung[i].tamhop.includes(y.id)) &&
                    x.saos.some(y => y.id === atl.id) &&
                    x.cungs.some(y => y.name === ThapNhiCung[i].cungchu)
                    //x.lucthans.every(y =>[6].includes(y.id))
                  )
                  Chugiai.push(...DacTinh)
                  return (
                    <Tooltip placement="right"
                      title={
                        <React.Fragment>
                          {DacTinh.map((b) =>
                            <>
                              <div>- {b.name}</div>
                              <div>{b.description}</div>
                            </>
                          )}
                        </React.Fragment>
                      }>
                      <div className={atl.csssao}>{atl.name}</div>
                    </Tooltip>
                  )
                })}
              </div>
              <div className="saoxau">
                {ThapNhiCung[i].sao.filter(x => x.saoloai === 'saoxau' || x.saoloai === 'sattinh' || x.saoloai === 'baitinh' || x.saoloai === 'amtinh').map((ax) => {
                  DacTinh = loigiai.filter(x => x.saos.every(y => ThapNhiCung[i].tamhop.includes(y.id)) &&
                    x.saos.some(y => y.id === ax.id) &&
                    x.cungs.some(y => y.name === ThapNhiCung[i].cungchu)
                    //x.lucthans.every(y =>[6].includes(y.id))
                  )
                  Chugiai.push(...DacTinh)
                  if (Object.keys(maTranDacTinh).some(mt => parseInt(mt) === ax.id)) {
                    return (
                      <Tooltip placement="right"
                        title={
                          <React.Fragment>
                            {DacTinh.map((b) =>
                              <>
                                <div>- {b.name}</div>
                                <div>{b.description}</div>
                              </>
                            )}
                          </React.Fragment>
                        }>
                        <div className={ax.csssao}>{ax.name} {maTranDacTinh[ax.id][i]}</div>
                      </Tooltip>
                    )
                  }
                  else return (
                    <Tooltip placement="right"
                      title={
                        <React.Fragment>
                          {DacTinh.map((b) =>
                            <>
                              <div>- {b.name}</div>
                              <div>{b.description}</div>
                            </>
                          )}
                        </React.Fragment>
                      }>
                      <div className={ax.csssao}>{ax.name}</div>
                    </Tooltip>
                  )
                })}
                {ThapNhiCung[i].sao.filter(x => x.saoloai === 'luuxau').map((axl) => {
                  DacTinh = loigiai.filter(x => x.saos.every(y => ThapNhiCung[i].tamhop.includes(y.id)) &&
                    x.saos.some(y => y.id === axl.id) &&
                    x.cungs.some(y => y.name === ThapNhiCung[i].cungchu)
                    //x.lucthans.every(y =>[6].includes(y.id))
                  )
                  return (
                    <Tooltip placement="right"
                      title={
                        <React.Fragment>
                          {DacTinh.map((b) =>
                            <>
                              <div>- {b.name}</div>
                              <div>{b.description}</div>
                            </>
                          )}
                        </React.Fragment>
                      }>
                      <div className={axl.csssao}>{axl.name}</div>
                    </Tooltip>
                  )
                })}
              </div>
              <div className="tuanTriet">
                {ThapNhiCung[i].sao.filter(x => x.saoloai === 'tuantriet').map((att) =>
                  <span className={"label " + att.csssao}>{att.name}</span>
                )}
              </div>
            </div>
          </div>
          <div className="grid cung-bottom">
            <div className="col col-3 tooltips" title={"Tiểu hạn của năm " + ThapNhiCung[i].tieuhan}>{ThapNhiCung[i].tieuhan}</div>

            <div className="col col-5 ">
              {ThapNhiCung[i].sao.filter(x => x.saoloai === 'truongsinh').map((ats) => {
                DacTinh = loigiai.filter(x => x.saos.every(y => ThapNhiCung[i].tamhop.includes(y.id)) &&
                  x.saos.some(y => y.id === ats.id) &&
                  x.cungs.some(y => y.name === ThapNhiCung[i].cungchu)
                  //x.lucthans.every(y =>[6].includes(y.id))
                )
                return (
                  <Tooltip placement="right"
                    title={
                      <React.Fragment>
                        {DacTinh.map((b) =>
                          <>
                            <div>- {b.name}</div>
                            <div>{b.description}</div>
                          </>
                        )}
                      </React.Fragment>
                    }>
                    <div className={ats.csssao}>{ats.name}</div>
                  </Tooltip>
                )
              })}
            </div>
            <div className="col col-4 ">{ThapNhiCung[i].nguyethan}</div>
          </div>

        </>,
        document.getElementById(i + 1)
      )
    }
    console.log(Chugiai)
    console.log(Chugiai.filter(b =>
      b.cungs.every(a => [1, 5, 7, 9].includes(a.id)) &&
      b.cungs.some(y => y.id == 1)
    )
      // b.cungs.some(a =>a.id ==1))
    )
    // console.log(Chugiai.filter((b) => b.cungs.map(a.name === "Tài bạch")))
    ReactDOM.render(
      <>
        <div>Lời giải</div>
        <b>Mệnh</b>
        {Chugiai.filter(b =>
          b.cungs.every(a => [1, 5, 7, 9].includes(a.id)) &&
          b.cungs.some(y => y.id == 1)
        ).map((c) =>
          <>
            <div>- {c.name}</div>
            <div>{c.description}</div>
          </>
        )}
        <b>Phụ mẫu</b>
        {Chugiai.filter(b =>
          b.cungs.every(a => [2, 6, 8, 10].includes(a.id)) &&
          b.cungs.some(y => y.id == 2)
        ).map((c) =>
          <>
            <div>- {c.name}</div>
            <div>{c.description}</div>
          </>
        )}
        <b>Phúc đức</b>
        {Chugiai.filter(b =>
          b.cungs.every(a => [3, 7, 9, 11].includes(a.id)) &&
          b.cungs.some(y => y.id == 3)
        ).map((c) =>
          <>
            <div>- {c.name}</div>
            <div>{c.description}</div>
          </>
        )}
        <b>Điền trạch</b>
        {Chugiai.filter(b =>
          b.cungs.every(a => [4, 8, 10, 12].includes(a.id)) &&
          b.cungs.some(y => y.id == 4)
        ).map((c) =>
          <>
            <div>- {c.name}</div>
            <div>{c.description}</div>
          </>
        )}
        <b>Quan lộc</b>
        {Chugiai.filter(b =>
          b.cungs.every(a => [5, 9, 11, 1].includes(a.id)) &&
          b.cungs.some(y => y.id == 5)
        ).map((c) =>
          <>
            <div>- {c.name}</div>
            <div>{c.description}</div>
          </>
        )}
        <b>Nô bộc</b>
        {Chugiai.filter(b =>
          b.cungs.every(a => [6, 10, 12, 2].includes(a.id)) &&
          b.cungs.some(y => y.id == 6)
        ).map((c) =>
          <>
            <div>- {c.name}</div>
            <div>{c.description}</div>
          </>
        )}
        <b>Thiên di</b>
        {Chugiai.filter(b =>
          b.cungs.every(a => [7, 11, 1, 3].includes(a.id)) &&
          b.cungs.some(y => y.id == 7)
        ).map((c) =>
          <>
            <div>- {c.name}</div>
            <div>{c.description}</div>
          </>
        )}
        <b>Tật ách</b>
        {Chugiai.filter(b =>
          b.cungs.every(a => [8, 12, 2, 4].includes(a.id)) &&
          b.cungs.some(y => y.id == 8)
        ).map((c) =>
          <>
            <div>- {c.name}</div>
            <div>{c.description}</div>
          </>
        )}
        <b>Tài bạch</b>
        {Chugiai.filter(b =>
          b.cungs.every(a => [9, 1, 3, 5].includes(a.id)) &&
          b.cungs.some(y => y.id == 9)
        ).map((c) =>
          <>
            <div>- {c.name}</div>
            <div>{c.description}</div>
          </>
        )}
        <b>Tử tức</b>
        {Chugiai.filter(b =>
          b.cungs.every(a => [10, 2, 4, 6].includes(a.id)) &&
          b.cungs.some(y => y.id == 10)
        ).map((c) =>
          <>
            <div>- {c.name}</div>
            <div>{c.description}</div>
          </>
        )}
        <b>Phu thê</b>
        {Chugiai.filter(b =>
          b.cungs.every(a => [11, 3, 5, 7].includes(a.id)) &&
          b.cungs.some(y => y.id == 11)
        ).map((c) =>
          <>
            <div>- {c.name}</div>
            <div>{c.description}</div>
          </>
        )}
        <b>Huynh đệ</b>
        {Chugiai.filter(b =>
          b.cungs.every(a => [12, 4, 6, 8].includes(a.id)) &&
          b.cungs.some(y => y.id == 12)
        ).map((c) =>
          <>
            <div>- {c.name}</div>
            <div>{c.description}</div>
          </>
        )}

      </>,
      document.getElementById("loigiai")
    )
  }

  function printPdf() {
    const input = document.getElementById('laso');
    html2canvas(input, {
      width: 800,
      height: 960,
      scale: 0.9
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        console.log(imgData)
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(imgData, 'JPEG', 10, 20);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
  }

  return (
    <div className="all">
      <div className="masthead">
        <div className="container">
          <h1 className="wordmark">Chương trình lập lá số tử vi</h1>
          <div className="formborder">
            <Form>
              <div className="grid thongtin">
                <div className="col col-3">Họ tên</div>
                <div className="col col-9">
                  <Input
                    type="text"
                    onChange={(e) => {
                      const val = e.target.value;
                      setInput((prevState) => {
                        return { ...prevState, name: val };
                      });
                    }}
                  >
                  </Input>
                </div>
              </div>
              <div className="grid thongtin">
                <div className="col col-3">Giới tính</div>
                <div className="col col-5">
                  <Input
                    type="select"
                    onChange={(e) => {
                      const val = e.target.value;
                      setInput((prevState) => {
                        return { ...prevState, sex: val };
                        // return Object.assign({}, prevState, { message: val }); // Also works
                      });
                    }}
                  >
                    <option value="1">Nam</option>
                    <option value="-1">Nữ</option>
                  </Input>
                </div>
                <div className="col col-4">
                  Năm xem {" "}
                  <Input
                    type="text"
                    defaultValue={new Date().getFullYear()}
                    onChange={(e) => {
                      const val = e.target.value;
                      setInput((prevState) => {
                        return { ...prevState, namxem: val };
                      });
                    }}
                  >
                  </Input>
                </div>
              </div>
              <div className="grid thongtin">
                <div className="col col-3">Ngày tháng năm sinh</div>
                <div className="col col-5">
                  <Input
                    type="select"
                    defaultValue={new Date().getDate()}
                    onChange={(e) => {
                      const val = e.target.value;
                      setInput((prevState) => {
                        return { ...prevState, dd: val };
                        // return Object.assign({}, prevState, { message: val }); // Also works
                      });
                    }}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                    <option>21</option>
                    <option>22</option>
                    <option>23</option>
                    <option>24</option>
                    <option>25</option>
                    <option>26</option>
                    <option>27</option>
                    <option>28</option>
                    <option>29</option>
                    <option>30</option>
                    <option>31</option>
                  </Input>{" "}
                  / {" "}
                  <Input
                    type="select"
                    defaultValue={new Date().getMonth() + 1}
                    onChange={(e) => {
                      const val = e.target.value;
                      setInput((prevState) => {
                        return { ...prevState, mm: val };
                        // return Object.assign({}, prevState, { message: val }); // Also works
                      });
                    }}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                  </Input>{" "}
                  / {" "}
                  <Input
                    style={{ width: "118px" }}
                    type="text"
                    defaultValue={new Date().getFullYear()}
                    onChange={(e) => {
                      const val = e.target.value;
                      setInput((prevState) => {
                        return { ...prevState, yy: val };
                      });
                    }}
                  >
                  </Input>
                </div>
                <div className="col col-4">
                  Âm lịch? {" "}
                  <Input type="checkbox"
                    defaultChecked={input.checkbox}
                    onChange={(e) => {
                      setInput((prevState) => {
                        return { ...prevState, checkbox: !input.checkbox };
                      });
                    }}
                  />
                </div>
              </div>
              <div className="grid thongtin">
                <div className="col col-3">Giờ sinh</div>
                <div className="col col-3">
                  <Input
                    type="select"
                    onChange={(e) => {
                      const val = e.target.value;
                      setInput((prevState) => {
                        return { ...prevState, hh: val };
                        // return Object.assign({}, prevState, { message: val }); // Also works
                      });
                    }}
                  >
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                    <option>21</option>
                    <option>22</option>
                    <option>23</option>
                  </Input>
                </div>
                <div className="col col-3">
                  Múi giờ: {" "}
                  <Input
                    defaultValue="7"
                    type="select"
                    onChange={(e) => {
                      const val = e.target.value;
                      setInput((prevState) => {
                        return { ...prevState, timezone: val };
                        // return Object.assign({}, prevState, { message: val }); // Also works
                      });
                    }}
                  >
                    <option value="-12">-12</option>
                    <option value="-11">-11</option>
                    <option value="-10">-10</option>
                    <option value="-9">-9</option>
                    <option value="-8">-8</option>
                    <option value="-7">-7</option>
                    <option value="-6">-6</option>
                    <option value="-5">-5</option>
                    <option value="-4">-4</option>
                    <option value="-3">-3</option>
                    <option value="-2">-2</option>
                    <option value="-1">-1</option>
                    <option value="0">0</option>
                    <option value="1">+1</option>
                    <option value="2">+2</option>
                    <option value="3">+3</option>
                    <option value="4">+4</option>
                    <option value="5">+5</option>
                    <option value="6">+6</option>
                    <option value="7">+7 (Vietnam)</option>
                    <option value="8">+8</option>
                    <option value="9">+9</option>
                    <option value="10">+10</option>
                    <option value="11">+11</option>
                  </Input>
                </div>
              </div>
            </Form>

            {sao ? (
              <>
                <button class="button primary"
                  onClick={() => {
                    lapDiaBan()
                  }}
                >Nhập lá số
                </button>
              </>
            ) : (null)}
          </div>
        </div>
      </div>

      {ThongTin.nam ? (
        <>
          <div className="container textcenter actionbtn">
            <div className="col col-3">
              <button className="button primary"
                onClick={() => {
                  printPdf()
                }}
              >In lá số
              </button>
            </div>
          </div>
          {/* {showChugiai()} */}
          <div className="laso border" id="laso">
            <div className="grid">
              <div className="col col-3">
                <div className="container">
                  <div
                    className="grid diaCung border-bottom"
                    cung-id="6"
                    id="6"
                  >
                  </div>
                  <div
                    className="grid diaCung border-bottom"
                    cung-id="5"
                    id="5"
                  >
                  </div>
                  <div
                    className="grid diaCung border-bottom inset-border"
                    cung-id="4"
                    id="4"
                  >
                  </div>
                  <div className="grid diaCung" cung-id="3" id="3">
                  </div>
                </div>
              </div>
              <div className="col col-6">
                <div className="container">
                  <div className="grid">
                    <div
                      className="col col-6 diaCung border-left"
                      cung-id="7"
                      id="7"
                    >
                    </div>
                    <div
                      className="col col-6 diaCung border-left"
                      cung-id="8"
                      id="8"
                    >
                    </div>
                  </div>

                  <div
                    className="grid thienBan border-top border-left border-bottom border-right"
                    id="thienBan"
                  >
                    <ThienBan {...ThongTin} />
                  </div>
                  <div className="grid">
                    <div
                      className="col col-6 diaCung border-left"
                      cung-id="2"
                      id="2"
                    >
                    </div>
                    <div
                      className="col col-6 diaCung border-left"
                      cung-id="1"
                      id="1"
                    >
                    </div>
                  </div>
                </div>
              </div>
              <div className="col col-3">
                <div className="container">
                  <div
                    className="grid diaCung border-left border-bottom"
                    cung-id="9"
                    id="9"
                  >
                  </div>
                  <div
                    className="grid diaCung border-bottom"
                    cung-id="10"
                    id="10"
                  >
                  </div>
                  <div
                    className="grid diaCung border-bottom"
                    cung-id="11"
                    id="11"
                  >
                  </div>
                  <div className="grid diaCung border-left" cung-id="12" id="12">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container" id="loigiai"></div>
        </>
      ) : (null)}
    </div>

  );
}
