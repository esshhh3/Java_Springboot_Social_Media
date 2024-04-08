function ChatMessages() {
  return (
    <div
      className={`flex ${true ? "justify-start" : "justify-end"} text-white`}
    >
      <div
        className={`p-1 ${
          true ? "rounded-md" : "px-5 rounded-full"
        } bg-[#191c29]`}
      >
        {true && (
          <img className="w-[15rem] h-[17rem] object-cover rounded-md" src="https://images.unsplash.com/photo-1578632749014-ca77efd052eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFuaW1lfGVufDB8fDB8fHww" />
        )}
        <p className={`${true ? "py-2" : "py-1"}`}>message</p>
      </div>
    </div>
  );
}

export default ChatMessages;
