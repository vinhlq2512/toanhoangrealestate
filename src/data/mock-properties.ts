import type { Locale } from "@/i18n/routing";

export type PropertyType = "apartment" | "house";
export type PropertyArea = "osaka" | "kobe";
export type LocalizedText = Record<Locale, string>;

export interface SampleProperty {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  type: PropertyType;
  area: PropertyArea;
  neighborhood: LocalizedText;
  address: LocalizedText;
  price: number;
  currency: "JPY";
  floorArea: number;
  floorPlan: string;
  nearestStation: LocalizedText;
  stationWalkMinutes: number;
  images: string[];
  amenities: LocalizedText[];
  createdAt: string;
}

export const sampleProperties: SampleProperty[] = [
  {
    id: "sample-001", slug: "namba-city-apartment", type: "apartment", area: "osaka",
    title: { vi: "Căn hộ Namba sáng thoáng", en: "Bright Namba apartment", zh: "难波明亮公寓" },
    description: { vi: "Căn hộ mẫu gần các tuyến tàu và tiện ích đô thị ở Namba. Diện tích và chi phí chỉ nhằm minh họa cách trình bày thông tin.", en: "A sample apartment near Namba rail connections and city amenities. Area and costs are illustrative only.", zh: "靠近难波交通线路和城市设施的示例公寓。面积和费用仅用于演示。" },
    neighborhood: { vi: "Namba, Naniwa-ku, Osaka", en: "Namba, Naniwa-ku, Osaka", zh: "大阪市浪速区难波" },
    address: { vi: "Khu vực Namba, Osaka (địa chỉ minh họa)", en: "Namba area, Osaka (sample address)", zh: "大阪难波地区（示例地址）" },
    price: 72000, currency: "JPY", floorArea: 27.4, floorPlan: "1K",
    nearestStation: { vi: "Ga Namba", en: "Namba Station", zh: "难波站" }, stationWalkMinutes: 7,
    images: ["/images/properties/osaka-apartment-interior.png", "/images/properties/osaka-apartment-interior.png"],
    amenities: [
      { vi: "Bếp riêng", en: "Private kitchen", zh: "独立厨房" },
      { vi: "Điều hòa", en: "Air conditioning", zh: "空调" },
      { vi: "Gần nhà ga", en: "Near public transit", zh: "靠近车站" },
    ], createdAt: "2026-10-22",
  },
  {
    id: "sample-002", slug: "sakuragawa-modern-1ldk", type: "apartment", area: "osaka",
    title: { vi: "Căn hộ hiện đại tại Sakuragawa", en: "Modern Sakuragawa 1LDK", zh: "樱川现代 1LDK 公寓" },
    description: { vi: "Ví dụ căn hộ 1LDK ở khu vực Sakuragawa, phù hợp cho một người hoặc cặp đôi. Thông tin không đại diện cho căn hộ đang mở thuê.", en: "A sample 1LDK in Sakuragawa, suited to one person or a couple. This does not represent a current vacancy.", zh: "樱川地区的 1LDK 示例公寓，适合单人或情侣居住。此信息不代表当前空房。" },
    neighborhood: { vi: "Sakuragawa, Naniwa-ku, Osaka", en: "Sakuragawa, Naniwa-ku, Osaka", zh: "大阪市浪速区樱川" },
    address: { vi: "Khu vực Sakuragawa, Osaka (địa chỉ minh họa)", en: "Sakuragawa area, Osaka (sample address)", zh: "大阪樱川地区（示例地址）" },
    price: 89000, currency: "JPY", floorArea: 38.6, floorPlan: "1LDK",
    nearestStation: { vi: "Ga Sakuragawa", en: "Sakuragawa Station", zh: "樱川站" }, stationWalkMinutes: 5,
    images: ["/images/properties/japanese-rental-apartment.png", "/images/services/warm-apartment-sunset.png"],
    amenities: [
      { vi: "Phòng khách riêng", en: "Separate living room", zh: "独立客厅" },
      { vi: "Tủ để đồ", en: "Storage closet", zh: "储物柜" },
      { vi: "Ban công", en: "Balcony", zh: "阳台" },
    ], createdAt: "2026-10-19",
  },
  {
    id: "sample-003", slug: "tennoji-family-home", type: "apartment", area: "osaka",
    title: { vi: "Căn hộ gia đình ở Tennoji", en: "Tennoji family apartment", zh: "天王寺家庭公寓" },
    description: { vi: "Mẫu căn hộ 2LDK trong khu dân cư Tennoji. Vui lòng xem đây là dữ liệu mô phỏng cho bộ lọc và trang chi tiết.", en: "A sample 2LDK in a residential part of Tennoji. This is mock data for the filters and detail page.", zh: "天王寺住宅区的 2LDK 示例公寓。本条目仅用于演示筛选和详情页面。" },
    neighborhood: { vi: "Tennoji-ku, Osaka", en: "Tennoji-ku, Osaka", zh: "大阪市天王寺区" },
    address: { vi: "Khu vực Tennoji, Osaka (địa chỉ minh họa)", en: "Tennoji area, Osaka (sample address)", zh: "大阪天王寺地区（示例地址）" },
    price: 118000, currency: "JPY", floorArea: 54.2, floorPlan: "2LDK",
    nearestStation: { vi: "Ga Tennoji", en: "Tennoji Station", zh: "天王寺站" }, stationWalkMinutes: 9,
    images: ["/images/properties/village-house-apartment.png", "/images/properties/osaka-apartment-interior.png"],
    amenities: [
      { vi: "Hai phòng ngủ", en: "Two bedrooms", zh: "两间卧室" },
      { vi: "Thang máy", en: "Elevator", zh: "电梯" },
      { vi: "Siêu thị gần nhà", en: "Nearby supermarket", zh: "附近有超市" },
    ], createdAt: "2026-10-17",
  },
  {
    id: "sample-004", slug: "suminoe-detached-home", type: "house", area: "osaka",
    title: { vi: "Nhà riêng mẫu ở Suminoe", en: "Sample Suminoe detached house", zh: "住之江示例独栋住宅" },
    description: { vi: "Mẫu nhà riêng 3DK ở Suminoe để minh họa cách hiển thị nhà gia đình. Địa chỉ và thông tin thuê không phải tin đăng thật.", en: "A sample 3DK detached home in Suminoe to demonstrate family-house details. Address and rental information are not real listings.", zh: "住之江 3DK 独栋住宅示例，用于展示家庭住宅详情。地址和租赁信息均非真实房源。" },
    neighborhood: { vi: "Suminoe-ku, Osaka", en: "Suminoe-ku, Osaka", zh: "大阪市住之江区" },
    address: { vi: "Khu vực Suminoe, Osaka (địa chỉ minh họa)", en: "Suminoe area, Osaka (sample address)", zh: "大阪住之江地区（示例地址）" },
    price: 97000, currency: "JPY", floorArea: 63.8, floorPlan: "3DK",
    nearestStation: { vi: "Ga Suminoe-koen", en: "Suminoe-koen Station", zh: "住之江公园站" }, stationWalkMinutes: 11,
    images: ["/images/properties/leopalace-studio-apartment.png", "/images/properties/japanese-rental-apartment.png"],
    amenities: [
      { vi: "Ba phòng đa năng", en: "Three flexible rooms", zh: "三间多功能房" },
      { vi: "Khu dân cư yên tĩnh", en: "Quiet residential area", zh: "安静的住宅区" },
      { vi: "Không gian để xe đạp", en: "Bicycle parking", zh: "自行车停车位" },
    ], createdAt: "2026-10-15",
  },
  {
    id: "sample-005", slug: "sannomiya-compact-apartment", type: "apartment", area: "kobe",
    title: { vi: "Căn hộ mẫu gần Sannomiya", en: "Compact Sannomiya apartment", zh: "三宫站附近紧凑型公寓" },
    description: { vi: "Căn hộ 1K minh họa tại trung tâm Kobe, gần các tuyến giao thông và khu mua sắm.", en: "A sample 1K in central Kobe, near transit connections and shopping areas.", zh: "神户市中心的 1K 公寓示例，靠近交通线路和购物区。" },
    neighborhood: { vi: "Chuo-ku, Kobe", en: "Chuo-ku, Kobe", zh: "神户市中央区" },
    address: { vi: "Khu vực Sannomiya, Kobe (địa chỉ minh họa)", en: "Sannomiya area, Kobe (sample address)", zh: "神户三宫地区（示例地址）" },
    price: 76000, currency: "JPY", floorArea: 29.5, floorPlan: "1K",
    nearestStation: { vi: "Ga Sannomiya", en: "Sannomiya Station", zh: "三宫站" }, stationWalkMinutes: 6,
    images: ["/images/properties/sabai-apartment.png", "/images/properties/osaka-apartment-interior.png"],
    amenities: [
      { vi: "Điều hòa", en: "Air conditioning", zh: "空调" },
      { vi: "Bếp điện", en: "Electric cooktop", zh: "电磁炉" },
      { vi: "Gần trung tâm", en: "Near the city center", zh: "靠近市中心" },
    ], createdAt: "2026-10-20",
  },
  {
    id: "sample-006", slug: "hyogo-family-house", type: "house", area: "kobe",
    title: { vi: "Nhà gia đình mẫu ở Hyogo-ku", en: "Sample family home in Hyogo-ku", zh: "兵库区家庭住宅示例" },
    description: { vi: "Mẫu nhà 3LDK ở khu vực Hyogo-ku dành cho gia đình. Nội dung được tạo để kiểm tra giao diện, không phải nhà đang giao dịch.", en: "A sample 3LDK family home in Hyogo-ku. This content is for interface review, not a home currently listed.", zh: "兵库区的 3LDK 家庭住宅示例。该内容用于界面展示，并非当前挂牌房屋。" },
    neighborhood: { vi: "Hyogo-ku, Kobe", en: "Hyogo-ku, Kobe", zh: "神户市兵库区" },
    address: { vi: "Khu vực Hyogo-ku, Kobe (địa chỉ minh họa)", en: "Hyogo-ku area, Kobe (sample address)", zh: "神户兵库区（示例地址）" },
    price: 125000, currency: "JPY", floorArea: 76.1, floorPlan: "3LDK",
    nearestStation: { vi: "Ga Hyogo", en: "Hyogo Station", zh: "兵库站" }, stationWalkMinutes: 10,
    images: ["/images/properties/ur-apartment-sakura.png", "/images/properties/japanese-rental-apartment.png"],
    amenities: [
      { vi: "Ba phòng ngủ", en: "Three bedrooms", zh: "三间卧室" },
      { vi: "Phòng khách và bếp riêng", en: "Separate living room and kitchen", zh: "独立客厅与厨房" },
      { vi: "Phù hợp gia đình", en: "Family-friendly layout", zh: "适合家庭居住的布局" },
    ], createdAt: "2026-10-12",
  },
];

export function localize(value: LocalizedText, locale: Locale): string {
  return value[locale] ?? value.vi;
}
