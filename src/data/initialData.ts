import { ProjectData } from '../types';
import { generateInitialUnits } from './masterplanUnits';

export const initialProjectData: ProjectData = {
  general: {
    projectName: "QUẢNG YÊN CENTRO",
    tagline: "ĐÔ THỊ THƯƠNG MẠI & NGHỈ DƯỠNG TRUNG TÂM",
    subDescription: "Biểu tượng thịnh vượng mới tại tâm điểm phát triển kinh tế ven biển Quảng Yên - Quảng Ninh",
    hotline: "0968 186 288",
    zaloNumber: "0968186288",
    email: "lienhe@quangyencentro.vn",
    address: "Đường Trần Hưng Đạo, Phường Quảng Yên, Thị xã Quảng Yên, Tỉnh Quảng Ninh",
    tour360Url: "https://kuula.co/share/collection/7lKjH",
    brochureUrl: "https://drive.google.com",
    consultationTitle: "ĐĂNG KÝ NHẬN BẢNG GIÁ & CHÍNH SÁCH ĐỘC QUYỀN",
    consultationSubtitle: "Chuyên viên tư vấn chủ đầu tư hỗ trợ trực tiếp 24/7 - Ưu tiên chọn căn góc đẹp nhất"
  },
  intro: {
    badge: "TÂM ĐIỂM THỊNH VƯỢNG",
    title: "Tổng quan dự án",
    headline: "Khởi Nguồn Vượng Khí - Đón Đầu Chu Kỳ Phát Triển Bứt Phá",
    paragraph1: "Quảng Yên Centro sở hữu vị thế độc tôn ngay trung tâm hành chính - kinh tế thị xã Quảng Yên, đón trọn dòng chảy giao thương sầm uất kết nối tam giác kinh tế vàng Hà Nội - Hải Phòng - Quảng Ninh. Dự án được quy hoạch bài bản với chuỗi nhà phố thương mại, liền kề và biệt thự ven sông đẳng cấp.",
    paragraph2: "Với định hướng phát triển trở thành tâm điểm thương mại dịch vụ hiện đại bậc nhất khu vực, Quảng Yên Centro mang đến chuẩn sống nghỉ dưỡng thượng lưu, pháp lý hoàn thiện minh bạch và tiềm năng sinh lời vượt trội cho các nhà đầu tư thông thái.",
    bannerImage: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=2000&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop",
    overview: {
      projectName: "Quảng Yên Centro",
      location: "Khu Cát Thành, phường Đông Mai, tỉnh Quảng Ninh",
      scale: "11,2 ha",
      totalProducts: "320 căn, bao gồm:",
      shophouseCount: "240 căn nhà liền kề/ Shophouse (85 - 96 m²)",
      villaCount: "80 căn biệt thự (180 - 252 m²)",
      legal: "Sở hữu lâu dài"
    },
    stats: [
      { id: "s1", label: "Tổng quy mô", value: "11,2 ha", subtext: "Khu đô thị hoàn chỉnh đồng bộ" },
      { id: "s2", label: "Tổng số lượng", value: "320 căn", subtext: "240 Liền kề/Shophouse & 80 Biệt thự" },
      { id: "s3", label: "Diện tích linh hoạt", value: "85 – 252 m²", subtext: "Thiết kế tối ưu công năng" },
      { id: "s4", label: "Pháp lý sở hữu", value: "Sở hữu lâu dài", subtext: "Sổ đỏ từng lô - an tâm đầu tư" }
    ]
  },
  products: {
    badge: "SẢN PHẨM DỰ ÁN",
    title: "Các loại hình căn hộ",
    subtitle: "Thiết kế hiện đại, tối ưu diện tích và công năng sử dụng cho từng nhu cầu sống",
    description: "Thiết kế hiện đại, tối ưu diện tích và công năng sử dụng cho từng nhu cầu sống",
    items: [
      {
        id: "prod-01",
        orderNumber: "01.",
        title: "Shophouse Thương Mại",
        area: "85 – 120 m²",
        frontage: "5 – 6,5 m",
        quantity: "140 căn",
        floors: "4,5 tầng",
        depth: "17 m",
        description: "Vị trí đắc địa mặt tiền đại lộ sầm uất, thiết kế tối ưu 2 trong 1 vừa kinh doanh sinh lời vượt trội vừa an cư lý tưởng.",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
        tag: "MẶT TIỀN ĐẠI LỘ"
      },
      {
        id: "prod-02",
        orderNumber: "02.",
        title: "Nhà Liền Kề Phố",
        area: "75 – 95 m²",
        frontage: "5 – 5,5 m",
        quantity: "100 căn",
        floors: "4 tầng",
        depth: "15 m",
        description: "Không gian sống xanh an lành kề cận công viên và chuỗi tiện ích nội khu, đón trọn ánh sáng tự nhiên cho tổ ấm sum vầy.",
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
        tag: "KHÔNG GIAN XANH"
      },
      {
        id: "prod-03",
        orderNumber: "03.",
        title: "Biệt Thự Nghỉ Dưỡng",
        area: "150 – 250 m²",
        frontage: "10 – 15 m",
        quantity: "80 căn",
        floors: "3,5 tầng",
        depth: "16 m",
        description: "Tuyệt phẩm giới hạn dành cho chủ nhân danh giá với sân vườn khoáng đạt, kiến trúc tân cổ điển sang trọng đẳng cấp.",
        imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop",
        tag: "PHIÊN BẢN GIỚI HẠN"
      }
    ]
  },
  location: {
    badge: "VỊ TRÍ CHIẾN LƯỢC",
    title: "TÂM ĐIỂM GIAO THƯƠNG - KẾT NỐI KHÔNG GIỚI HẠN",
    description: "Tọa lạc tại mặt tiền trục giao thông huyết mạch kết nối trực tiếp cao tốc Hải Phòng - Hạ Long, kề cận trung tâm hành chính thị xã Quảng Yên và chuỗi đại đô thị công nghiệp sinh thái tỷ USD như Amata Sông Khoai, KCN Bắc Tiền Phong, KCN Đông Mai.",
    addressButtonText: "Đường Trần Hưng Đạo, Phường Quảng Yên, Thị xã Quảng Yên, Tỉnh Quảng Ninh",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59610.1283626243!2d106.772591!3d20.932822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a6011400e28f3%3A0x6bfe76e2794db544!2zUXXhuqNuZyBZw6puLCBRdeG6o25nIE5pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s",
    googleMapsLink: "https://maps.google.com/?q=Đường+Trần+Hưng+Đạo+Quảng+Yên+Quảng+Ninh",
    locationImage: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=1800&auto=format&fit=crop",
    regionalMapImage: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1600&auto=format&fit=crop",
    highlights: [
      { id: "c1", time: "01 Phút", destination: "Trường Đẳng tỉnh Quảng Ninh", description: "Ngay kề cận khu đô thị, thuận tiện di chuyển học tập hàng ngày" },
      { id: "c2", time: "02 Phút", destination: "Trường Đại học Công nghiệp Quảng Ninh CS2", description: "Tiếp cận cơ sở đào tạo đại học trọng điểm của vùng" },
      { id: "c3", time: "05 Phút", destination: "Chợ Minh Thành, KĐT Amata 714ha", description: "Trung tâm thương mại truyền thống và siêu dự án công nghiệp đô thị Amata" },
      { id: "c4", time: "08 Phút", destination: "KCN Đông Mai", description: "Tổ hợp công nghiệp công nghệ cao đang hoạt động sầm uất với hàng vạn công nhân" },
      { id: "c5", time: "10 Phút", destination: "Vin Hạ Long Xanh", description: "Đại đô thị phức hợp 10 tỷ USD đẳng cấp quốc tế của Tập đoàn Vingroup" },
      { id: "c6", time: "15 Phút", destination: "Nút giao Hạ Long Xanh, KCN Sông Khoai, BV Sản Nhi & BV Lão Khoa", description: "Hệ thống y tế tuyến tỉnh đầu ngành và cụm công nghiệp sinh thái Amata" },
      { id: "c7", time: "20 Phút", destination: "Đảo Tuần Châu, trung tâm Uông Bí, KCN Bắc Tiền Phong", description: "Trung tâm du lịch quốc tế Tuần Châu và đô thị công nghiệp phía Tây" },
      { id: "c8", time: "30 Phút", destination: "Cảng Đình Vũ, cảng Cái Lân, Bãi Cháy Hạ Long", description: "Cụm cảng biển nước sâu quốc tế và bãi tắm du lịch Bãi Cháy" },
      { id: "c9", time: "40 Phút", destination: "Sân bay Cát Bi", description: "Kết nối hàng không nội địa và quốc tế nhanh chóng qua cao tốc" },
      { id: "c10", time: "50 Phút", destination: "Cảng nước sâu Lạch Huyện", description: "Cảng cửa ngõ quốc tế lớn nhất miền Bắc kết nối toàn cầu" }
    ]
  },
  amenities: {
    badge: "TIỆN ÍCH ĐẶC QUYỀN",
    title: "HỆ THỐNG TIỆN ÍCH NỘI KHU ĐẲNG CẤP",
    description: "Không gian sống xanh chuẩn nghỉ dưỡng, trọn vẹn đặc quyền thể thao, giải trí và chăm sóc sức khỏe cho cư dân tinh hoa.",
    items: [
      {
        id: "a1",
        title: "Vườn Đoàn Viên",
        category: "TIỆN ÍCH TRUNG TÂM",
        type: "internal",
        description: "Không gian gắn kết đa thế hệ giữa thảm cỏ xanh mướt, điểm sum vầy ấm cúng cho mọi gia đình.",
        imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
        iconName: "Trees"
      },
      {
        id: "a2",
        title: "Vườn Thanh Âm",
        category: "TIỆN ÍCH TRUNG TÂM",
        type: "internal",
        description: "Khu vườn thi vị với tiếng nước róc rách, thanh âm êm dịu mang đến sự tĩnh tại và an yên cho tâm hồn.",
        imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1200&auto=format&fit=crop",
        iconName: "Sparkles"
      },
      {
        id: "a3",
        title: "Sân chơi trẻ em",
        category: "TIỆN ÍCH DÀNH CHO GIA ĐÌNH",
        type: "internal",
        description: "Thế giới sắc màu với thảm cỏ êm ái cùng trang thiết bị vận động an toàn theo tiêu chuẩn cho cư dân nhí.",
        imageUrl: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1200&auto=format&fit=crop",
        iconName: "Smile"
      },
      {
        id: "a4",
        title: "Khu vận động ngoài trời",
        category: "TIỆN ÍCH DÀNH CHO GIA ĐÌNH",
        type: "internal",
        description: "Cụm máy tập thể chất đa năng ngoài trời rợp bóng mát, khuyến khích nếp sống năng động cho cả nhà.",
        imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
        iconName: "Activity"
      },
      {
        id: "a5",
        title: "Nhà cộng đồng",
        category: "TIỆN ÍCH GIAO LƯU",
        type: "internal",
        description: "Không gian sinh hoạt chung hiện đại, sang trọng – nơi tổ chức các sự kiện, họp mặt và kết nối cộng đồng cư dân.",
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
        iconName: "Building2"
      },
      {
        id: "a6",
        title: "Khu cafe ngoài trời",
        category: "TIỆN ÍCH GIAO LƯU",
        type: "internal",
        description: "Điểm hẹn thư thái dưới tán cây xanh mát, thưởng thức đồ uống ngon lành và trò chuyện cùng bạn bè.",
        imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
        iconName: "Store"
      },
      {
        id: "a7",
        title: "Sân bóng rổ",
        category: "TIỆN ÍCH RÈN LUYỆN",
        type: "internal",
        description: "Sân bóng rổ tiêu chuẩn chất lượng cao, bề mặt sơn giảm chấn cho những trận cầu sôi động cuồng nhiệt.",
        imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop",
        iconName: "Activity"
      },
      {
        id: "a8",
        title: "Sân trượt patin",
        category: "TIỆN ÍCH RÈN LUYỆN",
        type: "internal",
        description: "Đường trượt phẳng mịn an toàn, kích thích đam mê tốc độ và sự khéo léo của các bạn trẻ.",
        imageUrl: "https://images.unsplash.com/photo-1564982752979-3f7bc974d29a?q=80&w=1200&auto=format&fit=crop",
        iconName: "Activity"
      },
      {
        id: "a9",
        title: "Vườn Yoga",
        category: "TIỆN ÍCH RÈN LUYỆN",
        type: "internal",
        description: "Sàn tập thiền chan hòa ánh ban mai, mang đến sự an yên, cân bằng năng lượng và thư thái tuyệt đối.",
        imageUrl: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1200&auto=format&fit=crop",
        iconName: "Sparkles"
      },
      {
        id: "a10",
        title: "Sân Pickleball",
        category: "TIỆN ÍCH RÈN LUYỆN",
        type: "internal",
        description: "Cụm sân thể thao thời thượng tiêu chuẩn quốc tế, gắn kết cộng đồng cư dân yêu thể thao mỗi ngày.",
        imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
        iconName: "Activity"
      }
    ]
  },
  inventory: {
    badge: "BẢNG HÀNG TRỰC TUYẾN",
    title: "CẬP NHẬT TÌNH TRẠNG CĂN THỜI GIAN THỰC",
    description: "Theo dõi tình trạng quỹ căn minh bạch theo từng Block & Phân khu. Cập nhật chi tiết các căn còn mở bán (Available) và đã giao dịch thành công (Sold).",
    masterplanImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1800&auto=format&fit=crop",
    units: generateInitialUnits()
  },
  gallery: {
    badge: "HÌNH ẢNH & MẶT BẰNG",
    title: "TUYỆT TÁC KIẾN TRÚC TÂN CỔ ĐIỂN CHÂU ÂU",
    description: "Từng đường nét kiến trúc tại Quảng Yên Centro được chạm khắc tinh xảo, tối ưu hóa công năng vừa để an cư vừa để khai thác kinh doanh sinh lời dài hạn.",
    masterplanImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1800&auto=format&fit=crop",
    items: [
      {
        id: "g1",
        title: "Phối cảnh tổng thể đô thị",
        category: "perspective",
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1600&auto=format&fit=crop",
        caption: "Bức tranh đô thị thịnh vượng hài hòa bên dòng sông êm đềm"
      },
      {
        id: "g2",
        title: "Shophouse mặt tiền đại lộ",
        category: "perspective",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
        caption: "Thiết kế 4.5 tầng tối ưu kinh doanh mặt tiền và ở tầng trên"
      },
      {
        id: "g3",
        title: "Mặt bằng phân lô tổng thể 1/500",
        category: "masterplan",
        imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
        caption: "Sơ đồ phân chia ranh giới các khối Shophouse, Liền kề và Tiện ích"
      },
      {
        id: "g4",
        title: "Nội thất Shophouse sang trọng",
        category: "interior",
        imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop",
        caption: "Không gian phòng khách duplex thông tầng đón ánh sáng tự nhiên"
      },
      {
        id: "g5",
        title: "Khu liền kề vườn sinh thái",
        category: "perspective",
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop",
        caption: "Không gian sống xanh mát với sân vườn riêng biệt từng căn"
      },
      {
        id: "g6",
        title: "Thực tế công trường hạ tầng",
        category: "actual",
        imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?q=80&w=1600&auto=format&fit=crop",
        caption: "Các tuyến đường nội khu đã thảm nhựa asphalt và trồng cây xanh"
      }
    ]
  },
  policy: {
    badge: "QUẢNG YÊN CENTRO",
    title: "CHÍNH SÁCH BÁN HÀNG & CHƯƠNG TRÌNH ƯU ĐÃI",
    slogan: "VUN ĐẮP CƠ ĐỒ - VỮNG NỀN GIA SẢN",
    description: "Chính sách bán hàng ưu việt tại Quảng Yên Centro mang đến phương án tài chính tối ưu, thanh khoản vững vàng cùng bảo chứng phát triển từ Cen Land.",
    bannerImage: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=1600&auto=format&fit=crop",
    bookingDeposit: "200.000.000 VNĐ / Căn",
    discountHighlight: "Chiết khấu lên đến 16% & Hỗ trợ lãi suất 70%",
    highlights: {
      htls: {
        title: "HỖ TRỢ LÃI SUẤT",
        rate: "70%",
        duration: "Trong 24 tháng hoặc đến 30/11/2028",
        scope: "Giá trị đất (gồm VAT)"
      },
      discount: {
        title: "CHIẾT KHẤU",
        rate: "16%",
        condition: "Với phương án thanh toán sớm"
      }
    },
    incentives: [
      {
        id: "i1",
        title: "Hỗ trợ lãi suất ưu đãi",
        value: "HTLS 70%",
        description: "Trong 24 tháng hoặc đến 30/11/2028 đối với Giá trị đất (gồm VAT)."
      },
      {
        id: "i2",
        title: "Chiết khấu thanh toán sớm",
        value: "Lên đến 16%",
        description: "Áp dụng tối ưu lợi nhuận cho khách hàng lựa chọn phương án thanh toán sớm."
      },
      {
        id: "i3",
        title: "Mức đặt cọc thiện chí",
        value: "200 Triệu VNĐ",
        description: "Ký thỏa thuận đặt cọc Ngày T để giữ vị trí đẹp và khóa quyền lợi ưu đãi."
      },
      {
        id: "i4",
        title: "Đơn vị phát triển uy tín",
        value: "CEN LAND",
        description: "Thương hiệu phát triển bất động sản hàng đầu với giải pháp tài chính minh bạch."
      }
    ],
    paymentSchedule: [
      { id: "p0", step: "Ngày T", milestone: "Ký thỏa thuận đặt cọc", percentage: "200 Triệu VNĐ", note: "Tiền đặt cọc" },
      { id: "p1", step: "Đợt 1", milestone: "T+10 Ký HĐMB", percentage: "30% Giá trị đất", note: "Bao gồm tiền Đặt cọc" },
      { id: "p2", step: "Đợt 2", milestone: "Sau 45 ngày", percentage: "10% Giá trị đất", note: "Giá trị đất" },
      { id: "p3", step: "Đợt 3", milestone: "Sau 90 ngày", percentage: "10% Giá trị đất", note: "Giá trị đất" },
      { id: "p4", step: "Đợt 4", milestone: "Sau 135 ngày", percentage: "10% Giá trị đất", note: "Giá trị đất" },
      { id: "p5", step: "Đợt 5", milestone: "Sau 180 ngày", percentage: "10% Giá trị đất", note: "Giá trị đất" },
      { id: "p6", step: "Đợt 6", milestone: "Sau 225 ngày", percentage: "10% Giá trị đất", note: "Giá trị đất" },
      { id: "p7", step: "Đợt 7", milestone: "Sau 270 ngày", percentage: "20% Giá trị đất", note: "Giá trị đất" },
      { id: "p8", step: "Đợt 8", milestone: "Vào ngày 1/6/2027", percentage: "25% Giá trị xây", note: "Giá trị xây" },
      { id: "p9", step: "Đợt 9", milestone: "Vào ngày 1/9/2027", percentage: "25% Giá trị xây", note: "Giá trị xây" },
      { id: "p10", step: "Đợt 10", milestone: "Bàn giao nhà dự kiến 31/12/2027", percentage: "Đủ 95%", note: "Số tiền còn lại để đủ 95% Tổng giá bán nhà ở" },
      { id: "p11", step: "Đợt 11", milestone: "Cấp GCN quyền sử dụng đất và tài sản", percentage: "5%", note: "Giá bán nhà ở còn lại của HĐMB" }
    ],
    plans: [
      {
        id: "plan-1",
        code: "pa1",
        title: "PHƯƠNG ÁN 1 – THANH TOÁN THƯỜNG",
        shortTitle: "Thanh Toán Thường",
        badge: "Chuẩn 11 đợt linh hoạt",
        highlight: "Chia nhỏ dòng vốn trong 270 ngày & giãn tiến độ đến khi nhận nhà",
        steps: [
          { step: "Ngày T", milestone: "Ký thỏa thuận đặt cọc", rate: "200 TRIỆU", category: "Tiền đặt cọc" },
          { step: "Đợt 1", milestone: "T+10 Ký HĐMB", rate: "30%", category: "Giá trị đất (Bao gồm tiền Đặt cọc)" },
          { step: "Đợt 2", milestone: "45 ngày", rate: "10%", category: "Giá trị đất" },
          { step: "Đợt 3", milestone: "90 ngày", rate: "10%", category: "Giá trị đất" },
          { step: "Đợt 4", milestone: "135 ngày", rate: "10%", category: "Giá trị đất" },
          { step: "Đợt 5", milestone: "180 ngày", rate: "10%", category: "Giá trị đất" },
          { step: "Đợt 6", milestone: "225 ngày", rate: "10%", category: "Giá trị đất" },
          { step: "Đợt 7", milestone: "270 ngày", rate: "20%", category: "Giá trị đất" },
          { step: "Đợt 8", milestone: "Vào ngày 1/6/2027", rate: "25%", category: "Giá trị xây" },
          { step: "Đợt 9", milestone: "Vào ngày 1/9/2027", rate: "25%", category: "Giá trị xây" },
          { step: "Đợt 10", milestone: "Bàn giao nhà dự kiến 31/12/2027", rate: "Đủ 95%", category: "Số tiền còn lại để đủ 95% Tổng giá bán nhà ở" },
          { step: "Đợt 11", milestone: "Cấp GCN QSDĐ & tài sản", rate: "5%", category: "Giá bán nhà ở còn lại của HĐMB" }
        ]
      },
      {
        id: "plan-2",
        code: "pa2",
        title: "PHƯƠNG ÁN 2 – THANH TOÁN SỚM",
        shortTitle: "Thanh Toán Sớm",
        badge: "Chiết khấu lên đến 16%",
        highlight: "Tối ưu hóa dòng tiền với mức chiết khấu cao nhất lên đến 16%",
        steps: [
          { step: "Ngày T", milestone: "Ký thỏa thuận đặt cọc", rate: "200 TRIỆU", category: "Tiền đặt cọc" },
          { step: "Đợt 1", milestone: "T+10 Ký HĐMB", rate: "30%", category: "Giá trị đất (Bao gồm tiền Đặt cọc)" },
          { step: "Đợt 2", milestone: "30 ngày", rate: "40%", category: "Giá trị đất" },
          { step: "Đợt 3", milestone: "60 ngày", rate: "30%", category: "Giá trị đất" },
          { step: "Đợt 4", milestone: "Vào ngày 1/6/2027", rate: "25%", category: "Giá trị xây" },
          { step: "Đợt 5", milestone: "Vào ngày 1/9/2027", rate: "25%", category: "Giá trị xây" },
          { step: "Đợt 6", milestone: "Bàn giao nhà dự kiến 31/12/2027", rate: "Đủ 95%", category: "Số tiền còn lại để đủ 95% Tổng giá bán nhà ở" },
          { step: "Đợt 7", milestone: "Cấp GCN QSDĐ & tài sản", rate: "5%", category: "Giá bán nhà ở còn lại của HĐMB" }
        ]
      },
      {
        id: "plan-3",
        code: "pa3",
        title: "PHƯƠNG ÁN 3 – TIẾN ĐỘ GIẢI NGÂN",
        shortTitle: "Tiến Độ Giải Ngân (HTLS)",
        badge: "Hỗ trợ lãi suất 70%",
        highlight: "Ngân hàng giải ngân 70% GTHĐ, hỗ trợ lãi suất 24 tháng hoặc đến 30/11/2028",
        steps: [
          { step: "Ngày T", milestone: "Ký thỏa thuận đặt cọc", rate: "200 TRIỆU", category: "Tiền đặt cọc" },
          { step: "Đợt 1", milestone: "T+10 Ký HĐMB", rate: "30%", category: "Giá trị đất (Bao gồm tiền Đặt cọc)" },
          { step: "Đợt 2", milestone: "30 ngày", rate: "70%", category: "Giá trị đất (Ngân hàng giải ngân HTLS)" },
          { step: "Đợt 3", milestone: "Vào ngày 1/6/2027", rate: "25%", category: "Giá trị xây" },
          { step: "Đợt 4", milestone: "Vào ngày 1/9/2027", rate: "25%", category: "Giá trị xây" },
          { step: "Đợt 5", milestone: "Bàn giao nhà dự kiến 31/12/2027", rate: "Đủ 95%", category: "Số tiền còn lại để đủ 95% Tổng giá bán nhà ở" },
          { step: "Đợt 6", milestone: "Cấp GCN QSDĐ & tài sản", rate: "5%", category: "Giá bán nhà ở còn lại của HĐMB" }
        ]
      }
    ],
    conditions: {
      title: "PHẠM VI, ĐIỀU KIỆN ÁP DỤNG",
      items: [
        "Chương trình bán hàng áp dụng cho các căn nhà thuộc Bảng giá kèm theo.",
        "Các giá trị chiết khấu, quà tặng, ưu đãi được tính trên Tổng Giá Trị Đất (“TGTĐ”) sau quà tặng, ưu đãi khác (nếu có).",
        "Các quà tặng, chiết khấu được quy thành tiền và trừ vào TGTĐ tại thời điểm Khách hàng ký Hợp Đồng Giao Dịch.",
        "Chương trình Hỗ trợ lãi suất không áp dụng cho các Giao dịch giải ngân quá thời hạn 20 ngày kể từ ngày đến hạn thanh toán."
      ]
    },
    validity: {
      title: "HIỆU LỰC",
      items: [
        "Thông báo này có hiệu lực áp dụng từ thời điểm ban hành và có thể kết thúc trước thời hạn mà không cần phải thông báo trước.",
        "Thông báo này thay thế và chấm dứt hiệu lực của các Chương trình bán hàng đã ban hành trước ngày 12/3/2026."
      ]
    },
    developer: {
      name: "CEN LAND",
      slogan: "Realizing your dreams",
      website: "www.quangyencentro.vn"
    }
  },
  progress: {
    badge: "TIẾN ĐỘ THI CÔNG",
    title: "CẬP NHẬN THỰC TẾ CÔNG TRƯỜNG THÁNG MỚI NHẤT",
    description: "Chủ đầu tư cam kết thi công đúng tiến độ và chất lượng kỹ thuật cao nhất với sự giám sát chặt chẽ của các đơn vị tư vấn hàng đầu.",
    overallPercentage: 88,
    lastUpdated: "Tháng 09/2026",
    milestones: [
      {
        id: "m1",
        date: "Tháng 08/2026",
        title: "Hoàn thiện 100% hệ thống hạ tầng ngầm",
        status: "completed",
        description: "Hệ thống cấp thoát nước, trạm biến áp ngầm và cáp viễn thông toàn khu đô thị đã nghiệm thu xong.",
        imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "m2",
        date: "Tháng 09/2026",
        title: "Trải thảm nhựa đường nội khu & Trồng cây xanh",
        status: "completed",
        description: "Trục đường chính rộng 20.5m đã thảm nhựa asphalt lớp 2, vỉa hè lát đá tự nhiên và lắp đặt đèn đường cao cấp.",
        imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "m3",
        date: "Hiện tại",
        title: "Thi công kết cấu thân dãy Shophouse phân khu A",
        status: "in_progress",
        description: "Đang tiến hành đổ bê tông sàn tầng 3 các dãy nhà phố thương mại trục chính, đảm bảo an toàn tuyệt đối.",
        imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "m4",
        date: "Dự kiến Quý 4/2026",
        title: "Cất nóc toàn bộ & Hoàn thiện cảnh quan trung tâm",
        status: "upcoming",
        description: "Đưa vào vận hành Công viên trung tâm Central Park, hồ điều hòa và quảng trường ánh sáng.",
        imageUrl: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=800&auto=format&fit=crop"
      }
    ]
  },
  legal: {
    badge: "PHÁP LÝ MINH BẠCH",
    title: "HỒ SƠ PHÁP LÝ DỰ ÁN QUẢNG YÊN CENTRO",
    description: "Dự án Khu dân cư Khe Cát (Quảng Yên Centro) sở hữu hồ sơ pháp lý chuẩn mực và hoàn chỉnh theo quy chuẩn Nhà nước, bảo chứng an toàn tuyệt đối cho nhà đầu tư.",
    summaryText: "Hồ sơ pháp lý vững vàng qua 3 trụ cột: (1) Quyết định chủ trương đầu tư • (2) Quyết định giao đất & Xác nhận 100% nghĩa vụ thuế ngân sách • (3) Phê duyệt quy hoạch 1/500 & Bản vẽ thiết kế mẫu nhà.",
    documents: [
      // 1. CHỦ TRƯƠNG ĐẦU TƯ
      {
        id: "leg-inv-1",
        group: "investment",
        groupTitle: "1. Chủ Trương Đầu Tư",
        title: "Phê duyệt kết quả lựa chọn nhà đầu tư thực hiện dự án",
        docNumber: "QĐ số 226/QĐ-UBND",
        authority: "UBND thị xã Quảng Yên",
        date: "23/02/2017",
        status: "Đã phê duyệt",
        description: "Phê duyệt kết quả lựa chọn nhà đầu tư thực hiện dự án Khu dân cư Khe Cát, phường Minh Thành, thị xã Quảng Yên.",
        fileUrl: "#"
      },
      {
        id: "leg-inv-2",
        group: "investment",
        groupTitle: "1. Chủ Trương Đầu Tư",
        title: "Phê duyệt chủ trương đầu tư xây dựng công trình nhà ở",
        docNumber: "QĐ số 2093/QĐ-UBND",
        authority: "UBND tỉnh Quảng Ninh",
        date: "22/06/2020",
        status: "Đầy đủ hiệu lực",
        description: "Phê duyệt chủ trương đầu tư xây dựng công trình nhà ở dự án Khu dân cư Khe Cát, phường Minh Thành, thị xã Quảng Yên.",
        fileUrl: "#"
      },

      // 2. GIẤY TỜ VỀ ĐẤT ĐAI
      {
        id: "leg-land-1",
        group: "land",
        groupTitle: "2. Giấy Tờ Về Đất Đai & Thuế",
        title: "Giao đất có thu tiền sử dụng đất và cho thuê đất trả tiền một lần",
        docNumber: "QĐ số 3536/QĐ-UBND",
        authority: "UBND tỉnh Quảng Ninh",
        date: "10/09/2020",
        status: "Đã giao đất",
        description: "Giao đất có thu tiền sử dụng đất và cho Công ty Cổ phần Đầu tư Thành Đạt VN thuê trả tiền một lần cho cả thời gian thuê để thực hiện dự án Khu dân cư Khe Cát tại phường Minh Thành, thị xã Quảng Yên.",
        fileUrl: "#"
      },
      {
        id: "leg-land-2",
        group: "land",
        groupTitle: "2. Giấy Tờ Về Đất Đai & Thuế",
        title: "Phê duyệt giá đất cụ thể tính tiền sử dụng & thuê đất một lần",
        docNumber: "QĐ số 3189/QĐ-UBND",
        authority: "UBND tỉnh Quảng Ninh",
        date: "01/11/2022",
        status: "Đã phê duyệt",
        description: "Phê duyệt giá đất cụ thể để tính tiền sử dụng đất ở, tiền thuê đất trả tiền một lần cho cả thời gian thuê đối với dự án KDC Khe Cát do Công ty CP Đầu tư Thành Đạt VN làm chủ đầu tư.",
        fileUrl: "#"
      },
      {
        id: "leg-land-3",
        group: "land",
        groupTitle: "2. Giấy Tờ Về Đất Đai & Thuế",
        title: "Xác nhận thực hiện nghĩa vụ thuế với ngân sách nhà nước (2022)",
        docNumber: "TB số 1358/TB-CCTKV",
        authority: "Chi cục thuế KV Uông Bí - Quảng Yên",
        date: "08/05/2023",
        status: "Hoàn tất nghĩa vụ thuế",
        description: "Xác nhận việc thực hiện nghĩa vụ thuế với ngân sách nhà nước (năm 2022).",
        fileUrl: "#"
      },
      {
        id: "leg-land-4",
        group: "land",
        groupTitle: "2. Giấy Tờ Về Đất Đai & Thuế",
        title: "Xác nhận thực hiện nghĩa vụ thuế với ngân sách nhà nước (2023)",
        docNumber: "TB số 1357/TB-CCTKV",
        authority: "Chi cục thuế KV Uông Bí - Quảng Yên",
        date: "08/05/2023",
        status: "Hoàn tất nghĩa vụ thuế",
        description: "Xác nhận việc thực hiện nghĩa vụ thuế với ngân sách nhà nước (năm 2023).",
        fileUrl: "#"
      },

      // 3. THÔNG TIN VỀ QUY HOẠCH - THIẾT KẾ CHI TIẾT
      {
        id: "leg-plan-1",
        group: "planning",
        groupTitle: "3. Quy Hoạch & Thiết Kế Chi Tiết",
        title: "Phê duyệt điều chỉnh cục bộ (lần 2) Quy hoạch chi tiết 1/500",
        docNumber: "QĐ số 3229/QĐ-UBND",
        authority: "UBND thị xã Quảng Yên",
        date: "25/06/2025",
        status: "Đã phê duyệt",
        description: "Phê duyệt điều chỉnh cục bộ (lần 2) Quy hoạch chi tiết xây dựng tỷ lệ 1/500 Khu dân cư Khe Cát, phường Minh Thành, thị xã Quảng Yên.",
        fileUrl: "#"
      },
      {
        id: "leg-plan-2",
        group: "planning",
        groupTitle: "3. Quy Hoạch & Thiết Kế Chi Tiết",
        title: "Bản vẽ điều chỉnh cục bộ (lần 2) Quy hoạch chi tiết xây dựng tỷ lệ 1/500",
        docNumber: "Bản vẽ QH 1/500 (Lần 2)",
        authority: "UBND TX. Quảng Yên duyệt",
        date: "Kèm QĐ số 3229/QĐ-UBND",
        status: "Bản vẽ chính thức",
        description: "Bản vẽ điều chỉnh cục bộ (lần 2) Quy hoạch chi tiết xây dựng tỷ lệ 1/500 Khu dân cư Khe Cát, phường Minh Thành, thị xã Quảng Yên.",
        fileUrl: "#"
      },
      {
        id: "leg-plan-3",
        group: "planning",
        groupTitle: "3. Quy Hoạch & Thiết Kế Chi Tiết",
        title: "Bản vẽ thiết kế đô thị mẫu nhà liền kề và nhà biệt thự",
        docNumber: "Bản vẽ thiết kế đô thị",
        authority: "CĐT Thành Đạt VN & Thẩm định",
        date: "Đồng bộ kiến trúc",
        status: "Mẫu thiết kế chuẩn",
        description: "Bản vẽ thiết kế đô thị mẫu nhà liền kề và nhà biệt thự tại dự án Khu dân cư Khe Cát, phường Minh Thành, thị xã Quảng Yên.",
        fileUrl: "#"
      }
    ]
  },
  tour360: {
    activeSceneId: "scene-flycam",
    scenes: [
      {
        id: "scene-flycam",
        title: "Toàn Cảnh Flycam Dự Án Trên Cao (360°)",
        description: "Bao quát 18.5 ha dự án, trục đường liên kết cao tốc và dòng sông Chanh thơ mộng.",
        panoramaUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop",
        thumbnailUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=400&auto=format&fit=crop"
      },
      {
        id: "scene-street",
        title: "Tuyến Phố Thương Mại Shophouse Đại Lộ",
        description: "Góc nhìn thực tế mặt tiền kinh doanh sầm uất với vỉa hè rộng 6m rợp bóng mát.",
        panoramaUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
        thumbnailUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop"
      },
      {
        id: "scene-villa",
        title: "Căn Hộ Mẫu Shophouse & Liền Kề",
        description: "Trải nghiệm không gian nội thất tân cổ điển sang trọng, bài trí tiện nghi đón ánh sáng tự nhiên.",
        panoramaUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
        thumbnailUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=400&auto=format&fit=crop"
      },
      {
        id: "scene-park",
        title: "Công Viên Trung Tâm & Hồ Điều Hòa",
        description: "Thư thái giữa mảng xanh tươi mát, đường dạo bộ ven nước và quảng trường ánh sáng.",
        panoramaUrl: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=2000&auto=format&fit=crop",
        thumbnailUrl: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=400&auto=format&fit=crop"
      }
    ]
  }
};
