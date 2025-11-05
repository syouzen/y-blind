import dayjs from "dayjs";
import ko from "dayjs/locale/ko";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale(ko);
dayjs.tz.setDefault("Asia/Seoul");
dayjs.extend(relativeTime);
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(weekOfYear);
dayjs.extend(updateLocale);

dayjs.updateLocale("ko", {
  relativeTime: {
    future: "%s후",
    past: "%s전",
    s: "1분",
    m: "1분",
    mm: "%d분",
    h: "1시간",
    hh: "%d시간",
    d: "어제",
    dd: "%d일",
    M: "1달",
    MM: "%d달",
    y: "1년",
    yy: "%d년",
  },
});

/**
 * @description 현재 시간과 주어진 시간의 차이를 계산하여 상대적인 시간을 반환합니다.
 * @param {string} time - 비교할 시간
 * @returns {string} 상대적인 시간
 */
export const calculateFromNow = (time: string) => {
  if (time) {
    const notiTime = dayjs(time);
    if (dayjs().diff(notiTime, "day") < 1) {
      return notiTime.fromNow().replace("전", "").replace("후", "");
    } else {
      return notiTime.format("YYYY.MM.DD");
    }
  }
  return "";
};

export default dayjs;
