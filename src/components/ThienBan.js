import React, { useState, useEffect } from "react";

export default function ThienBan(props){
    const [info, setInfo] = useState(props)
    useEffect(() => {
        setInfo(props);
        }, [props]
    );

    var date = new Date()
    var today =date.toLocaleString('en-GB')
    const thiencan = [0, "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"]
    const diachi = [0, "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"]
    var gio = parseInt(1.5+ info.gio/2)

    var age, nam, thang, ngay, thangam, ngayam
    if (info.checked ===false) {
        age = info.namxem - info.nama + 1
        ngay = info.ngay
        thang =info.thang
        nam = info.nam
        ngayam = info.ngaya
        thangam = info.thanga
    }
    if (info.checked ===true) {
        age = info.namxem - info.nam + 1
        ngay = info.ngaya
        thang =info.thanga
        nam = info.nama
        ngayam = info.ngay
        thangam = info.thang
    }
    if (gio ===13){
        gio = 1
    }

    var cuc = info.cuc
    if (cuc ===2){
        cuc = "Thủy Nhị Cục"
    }
    if (cuc ===3){
        cuc = "Mộc Tam Cục"
    }
    if (cuc ===4){
        cuc = "Kim Tứ Cục"
    }
    if (cuc ===5){
        cuc = "Thổ Ngũ Cục"
    }
    if (cuc ===6){
        cuc = "Hỏa Lục Cục"
    }
    //bát tự cần sửa
    //cục cần sửa
    return(
        <div className="noidung">
            <div className="header">Ngày xem: {today}</div>
            <div className="grid">
                <div className="col col-3 cotTrai">Họ tên</div>
                <div className="col col-9 cotPhai">{info.name}</div>
            </div>

            <div className="grid">
                <div className="col col-3 cotTrai">Bát tự</div>
                <div className="col  col-9 cotPhai">Năm {thiencan[info.thiencan]} {diachi[info.diachi]} tháng {diachi[info.thang]} ngày {diachi[info.ngay]}, giờ {diachi[gio]}</div>
            </div>

            <div class="grid">
                <div class="col col-3 cotTrai">Tuổi</div>
                <div class="col col-9 cotPhai">{age} tuổi </div>
            </div>

            <div class="grid">
                <div class="col col-3 cotTrai">Ngày sinh</div>
                <div class="col col-9 cotPhai">
                    <div>{ngayam}/{thangam}/{thiencan[info.thiencan]} {diachi[info.diachi]} (Âm lịch)</div>
                    <div>{ngay}/{thang}/{nam} (Dương lịch)</div>
                </div>
            </div>

                {/*        <div class="grid">*/}
                {/*        <div class="col col-3 cotTrai">Bản mệnh</div>*/}
                {/*        <div class="col col-9 cotPhai">*/}
                {/*    {{:banMenh}}*/}
                {/*        </div>*/}
                {/*        </div>*/}

            <div class="grid">
                <div class="col col-3 cotTrai">Cục</div>
                <div class="col col-9 cotPhai">
            {cuc}
                </div>
            </div>

                {/*        <div class="grid">*/}
                {/*        <div class="col col-3 cotTrai">Mệnh chủ</div>*/}
                {/*        <div class="col col-9 cotPhai">*/}
                {/*    {{:menhChu}}*/}
                {/*        </div>*/}
                {/*        </div>*/}

                {/*        <div class="grid">*/}
                {/*        <div class="col col-3 cotTrai">Thân chủ</div>*/}
                {/*        <div class="col col-9 cotPhai">*/}
                {/*    {{:thanChu}}*/}
                {/*        </div>*/}
                {/*        </div>*/}

                {/*        <div class="grid sinhkhac">*/}
                {/*    {{:sinhKhac}}*/}
                {/*        </div>*/}


                        <div class="mausac">
                        <div class="grid">
                        <span class="col col-2">Màu sắc</span>
                        <span class="col col-2 hanhKim gioithieuhanh">Kim</span>
                        <span class="col col-2 hanhThuy gioithieuhanh">Thủy</span>
                        <span class="col col-2 hanhHoa gioithieuhanh">Hỏa</span>
                        <span class="col col-2 hanhTho gioithieuhanh">Thổ</span>
                        <span class="col col-2 hanhMoc gioithieuhanh">Mộc</span>
                        </div>
                        </div>
        </div>
    )
}