import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

type CustomTimeAgoProps = {
  prefixText?: string;
  date: number | Date;
  postfixText?: string;
};

const CustomTimeAgo = ({ prefixText, date, postfixText, }: CustomTimeAgoProps) => {
  // console.log(date , 'type of date is --->' ,  typeof date)
  
  return (
    <div>
      {prefixText} <ReactTimeAgo date={new Date(date)} locale="en-US" /> {postfixText}
    </div>
  );
}
export default CustomTimeAgo;
