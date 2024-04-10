import PropTypes from "prop-types";
import { useSelector } from "react-redux";

function ChatMessages({text}) {

  const { auth, message } = useSelector((state) => state);
  const isReqUserMessage = auth.user?.id === text.user?.id;
  
  return (
    <div
      className={`flex ${!isReqUserMessage ? "justify-start" : "justify-end"} text-white`}
    >
      <div
        className={`p-1 ${
          text.image ? "rounded-md" : "px-5 rounded-full"
        } bg-[#191c29]`}
      >
        {text.image && (
          <img className="w-[15rem] h-[17rem] object-cover rounded-md" src={text.image} />
        )}
        <p className={`${true ? "py-2" : "py-1"}`}>{text.content}</p>
      </div>
    </div>
  );
}

ChatMessages.propTypes = {
  text: PropTypes.object.isRequired,
};

export default ChatMessages;
