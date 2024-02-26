import React, { useState, useEffect } from "react";
import { Controlled as ControlledEditor } from "react-codemirror2";
import { updateURLWithQuery } from "../../utils";

export const JwtCode = ({
  token,
  setToken,
  mode,
  decode,
}: {
  token: string;
  setToken: any;
  mode: string;
  decode: any;
}) => {
  // 디바운싱을 위한 상태와 타이머 변수
  const [debouncedValue, setDebouncedValue] = useState(token);
  let debounceTimer: NodeJS.Timeout;

  useEffect(() => {
    // token이 변경될 때마다 디바운싱을 위한 타이머를 재설정
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      // 일정 시간이 지난 후에 실제 처리를 수행
      updateURLWithQuery(debouncedValue, mode);
      setToken(debouncedValue);
      decode();
    }, 300); // 500ms 디바운싱 시간 설정
  }, [debouncedValue, mode, setToken, decode]);

  return (
    <div className="area-wrapper">
      <ControlledEditor
        value={token}
        options={{
          mode: "jwt",
          lineWrapping: true,
          readOnly: mode === "decode",
        }}
        onBeforeChange={(editor, data, value) => setDebouncedValue(value)}
      />
    </div>
  );
};
