export function LucThapHoaGiap(year){
    let LTHG=[
        {name: "HẢI TRUNG KIM", hanhid:1, css: "hanhKim" },
        {name: "HẢI TRUNG KIM", hanhid:1, css: "hanhKim" },
        {name: "LƯ TRUNG HỎA", hanhid:4, css: "hanhHoa"},
        {name: "LƯ TRUNG HỎA", hanhid:4, css: "hanhHoa"},
        {name:"ÐẠI LÂM MỘC", hanhid:2, css: "hanhMoc" },
        {name:"ÐẠI LÂM MỘC", hanhid:2, css: "hanhMoc" },
        {name:"LỘ BÀN THỔ", hanhid:5, css: "hanhTho" },
        {name:"LỘ BÀN THỔ", hanhid:5, css: "hanhTho" },
        {name:"KIẾM PHONG KIM", hanhid:1, css: "hanhKim" },
        {name:"KIẾM PHONG KIM", hanhid:1, css: "hanhKim" },
        {name:"SƠN ÐẦU HỎA", hanhid:4, css: "hanhHoa"},
        {name:"SƠN ÐẦU HỎA", hanhid:4, css: "hanhHoa"},
        {name:"GIÁNG HẠ THỦY", hanhid:3, css: "hanhThuy" },
        {name:"GIÁNG HẠ THỦY", hanhid:3, css: "hanhThuy" },
        {name:"THÀNH ÐẦU THỔ", hanhid:5, css: "hanhTho" },
        {name:"THÀNH ÐẦU THỔ", hanhid:5, css: "hanhTho" },
        {name:"BẠCH LẠP KIM", hanhid:1, css: "hanhKim" },
        {name:"BẠCH LẠP KIM", hanhid:1, css: "hanhKim" },
        {name:"DƯƠNG LIỄU MỘC", hanhid:2, css: "hanhMoc" },
        {name:"DƯƠNG LIỄU MỘC", hanhid:2, css: "hanhMoc" },
        {name:"TRUYỀN TRUNG THỦY", hanhid:3, css: "hanhThuy" },
        {name:"TRUYỀN TRUNG THỦY", hanhid:3, css: "hanhThuy" },
        {name:"TÍCH LỊCH HỎA", hanhid:4, css: "hanhHoa"},
        {name:"TÍCH LỊCH HỎA", hanhid:4, css: "hanhHoa"},
        {name:"ỐC THƯỢNG THỔ", hanhid:5, css: "hanhTho" },
        {name:"ỐC THƯỢNG THỔ", hanhid:5, css: "hanhTho" },
        {name:"TÒNG BÁ MỘC", hanhid:2, css: "hanhMoc" },
        {name:"TÒNG BÁ MỘC", hanhid:2, css: "hanhMoc" },
        {name:"TRƯỜNG LƯU THỦY", hanhid:3, css: "hanhThuy" },
        {name:"TRƯỜNG LƯU THỦY", hanhid:3, css: "hanhThuy" },
        {name:"SA TRUNG KIM", hanhid:1, css: "hanhKim" },
        {name:"SA TRUNG KIM", hanhid:1, css: "hanhKim" },
        {name:"SƠN HẠ HỎA", hanhid:4, css: "hanhHoa"},
        {name:"SƠN HẠ HỎA", hanhid:4, css: "hanhHoa"},
        {name:"BÌNH ÐỊA MỘC", hanhid:2, css: "hanhMoc" },
        {name:"BÌNH ÐỊA MỘC", hanhid:2, css: "hanhMoc" },
        {name:"BÍCH THƯỢNG THỔ", hanhid:5, css: "hanhTho" },
        {name:"BÍCH THƯỢNG THỔ", hanhid:5, css: "hanhTho" },
        {name:"PHÚ ÐĂNG HỎA", hanhid:4, css: "hanhHoa"},
        {name:"PHÚ ÐĂNG HỎA", hanhid:4, css: "hanhHoa"},
        {name:"KIM BẠCH KIM", hanhid:1, css: "hanhKim" },
        {name:"KIM BẠCH KIM", hanhid:1, css: "hanhKim" },
        {name:"THIÊN HÀ THỦY", hanhid:3, css: "hanhThuy" },
        {name:"THIÊN HÀ THỦY", hanhid:3, css: "hanhThuy" },
        {name:"ÐẠI TRẠCH THỔ", hanhid:5, css: "hanhTho" },
        {name:"ÐẠI TRẠCH THỔ", hanhid:5, css: "hanhTho" },
        {name:"XOA XUYẾN KIM", hanhid:1, css: "hanhKim" },
        {name:"XOA XUYẾN KIM", hanhid:1, css: "hanhKim" },
        {name:"TANG ÐỐ MỘC", hanhid:2, css: "hanhMoc" },
        {name:"TANG ÐỐ MỘC", hanhid:2, css: "hanhMoc" },
        {name:"ÐẠI KHÊ THỦY", hanhid:3, css: "hanhThuy" },
        {name:"ÐẠI KHÊ THỦY", hanhid:3, css: "hanhThuy" },
        {name:"SA TRUNG THỔ", hanhid:5, css: "hanhTho" },
        {name:"SA TRUNG THỔ", hanhid:5, css: "hanhTho" },
        {name:"THIÊN THƯỢNG HỎA", hanhid:4, css: "hanhHoa"},
        {name:"THIÊN THƯỢNG HỎA", hanhid:4, css: "hanhHoa"},
        {name:"THẠCH LỰU MỘC", hanhid:2, css: "hanhMoc" },
        {name:"THẠCH LỰU MỘC", hanhid:2, css: "hanhMoc" },
        {name:"ÐẠI HẢI THỦY", hanhid:3, css: "hanhThuy" },
        {name:"ÐẠI HẢI THỦY", hanhid:3, css: "hanhThuy" },
        {name:"ÐẠI LÂM MỘC", hanhid:2, css: "hanhMoc" },
        {name:"ÐẠI LÂM MỘC", hanhid:2, css: "hanhMoc" },
                ]
    return LTHG[year]
}

export function cuc(cucso){
    let cuc=[null,
            null,
            {name:"Thủy Nhị Cục", hanhid:3, css: "hanhThuy" },
            {name:"Mộc Tam Cục", hanhid:2, css: "hanhMoc" },
            {name:"Kim Tứ Cục", hanhid:1, css: "hanhKim" },
            {name:"Thổ Ngũ Cục", hanhid:5, css: "hanhTho" },
            {name:"Hỏa Lục Cục", hanhid:4, css: "hanhHoa"},
    ]
    return cuc[cucso]
}

export function sinhkhac(hanh1, hanh2){
    let matranSinhKhac = [
        [null, "Kim", "Mộc", "Thủy", "Hỏa", "Thổ"],
        ["Kim", "Mệnh Cục bình hòa", "Mệnh khắc Cục", "Mệnh sinh Cục", "Cục khắc Mệnh", "Cục sinh mệnh"],
        ["Mộc", "Cục khắc Mệnh", "Mệnh Cục bình hòa", "Cục sinh mệnh", "Mệnh sinh Cục", "Mệnh khắc Cục"],
        ["Thủy", "Cục sinh mệnh", "Mệnh sinh Cục", "Mệnh Cục bình hòa", "Mệnh khắc Cục", "Cục khắc Mệnh"],
        ["Hỏa", "Mệnh khắc Cục", "Cục sinh mệnh", "Cục khắc Mệnh", "Mệnh Cục bình hòa", "Mệnh sinh Cục"],
        ["Thổ", "Mệnh sinh Cục", "Cục khắc Mệnh", "Mệnh khắc Cục", "Cục sinh mệnh", "Mệnh Cục bình hòa"]
    ]
    return matranSinhKhac[hanh1][hanh2]
}
