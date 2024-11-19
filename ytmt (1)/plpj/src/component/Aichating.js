import { useState } from "react";

const AiChating = ({ Aichat }) => {
  const [chatHistory, setChatHistory] = useState([]); // JSON 배열 형태로 대화 관리
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleChatSubmit = async () => {
    if (inputValue.trim()) {
      // 사용자의 메시지를 JSON 배열에 추가
      const userMessage = { role: "user", content: inputValue };
      const updatedChatHistory = [...chatHistory, userMessage];
      setChatHistory(updatedChatHistory);

      setInputValue(""); // 입력 필드 초기화

      try {
        // 서버에 전체 대화 기록을 전송
        const generation = await Aichat({ prompt: inputValue });

        if (generation && generation.genera) {
          const botReply = { role: "assistant", content: generation.genera };
          setChatHistory((prevHistory) => [...prevHistory, botReply]);
        }
      } catch (error) {
        console.error("챗봇 응답 오류:", error);
      }
    }
  };

  return (
    <section className="py-5">
      <div className="container px-5">
        <div
          className="row bg-light rounded-3 py-5 px-4 px-md-5 AiChat"
          style={{ display: "flex", alignContent: "flex-start" }}
        >
          {chatHistory.length > 0 ? (
            chatHistory.map((message, index) => (
              <div
                key={index}
                className="message"
                style={{
                  justifyContent: message.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  className={
                    message.role === "user" ? "userChat-text" : "aiChat-text"
                  }
                >
                  {message.content}
                </div>
              </div>
            ))
          ) : (
            <p>여기에 챗봇과의 대화 내용이 표시됩니다.</p>
          )}
        </div>
        <div
          className="col"
          style={{
            padding: "0 3rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <input
            className="form-control"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="여기에 메시지를 입력하세요"
          />
          <button className="btn btn-primary btn-lg" onClick={handleChatSubmit}>
            <i className="bi bi-chat-dots" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AiChating;
