import { message } from "antd";
import CodeMirror from "codemirror";
import { ReactNode, useEffect, useState } from "react";
import { copyCurrentURLToClipboard, updateURLWithQuery } from "../utils";
import { DebugHook } from "../hooks/debug.hook";
import {
  JwtCode,
  JwtHeader,
  JwtPayload,
  JwtSigature,
  SelectAlgorithm,
  Warning,
} from "./index";
import "./Debugger.css";
import { DebuggerContainer } from "./DebuggerContainer";
import { Equipments } from "./Equipments";

export const Debugger = () => {
  useEffect(() => {
    if (window.location.hash !== "#debugger") {
      return;
    }
    setTimeout(() => {
      const element = document.getElementById("debugger");
      if (element) {
        const offset = 150; // Number of pixels you want to scroll above the element
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  }, []);

  const {
    token,
    setToken,
    secret,
    setSecret,
    base64Checked,
    setBase64Checked,
    discloseFrame,
    setDiscloseFrame,
    claims,
    setClaims,
    discolsures,
    setDiscolsures,
    header,
    setHeader,
    encode,
    decode,
    verify,
  } = DebugHook();

  type TabType = "claim" | "discloseFrame" | "discolsures";
  const [tab, setTab] = useState<TabType>("claim");
  const [isEcoded, setIsEncoded] = useState(false);

  const encodeClaim = () => {
    encode();
    setIsEncoded(true);
  };

  const decodeJwt = () => {
    decode();
    setIsEncoded(false);
  };

  const shareSdJwt = async () => {
    updateURLWithQuery(token, isEcoded);
    const result = await copyCurrentURLToClipboard();
    if (result) message.success("URL is copied to your clipboard", 2);
  };

  const tabValue = {
    claim: claims,
    discloseFrame: discloseFrame,
    discolsures: discolsures,
  };

  const tabHandler = {
    claim: setClaims,
    discloseFrame: setDiscloseFrame,
    discolsures: setDiscolsures,
  };

  useEffect(() => {
    // Parse the URL query parameters
    const queryParams = new URLSearchParams(window.location.search);
    const tokenParam = queryParams.get("token");
    const isEncode = queryParams.get("isEncode");

    // If the "token" parameter exists, use it as the initial state
    if (tokenParam) {
      setToken(tokenParam);
    }
    if (isEncode) {
      setIsEncoded(Boolean(isEncode));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="debugger-wrapper">
      <div className="debugger-title" id="debugger">
        Debugger
      </div>
      <Warning />
      <SelectAlgorithm />

      <Equipments
        isEcoded={isEcoded}
        encodeClaim={encodeClaim}
        decodeJwt={decodeJwt}
        shareSdJwt={shareSdJwt}
      />

      <div className={isEcoded ? "code-wrapper" : "code-reverse-wrapper"}>
        <DebuggerContainer headerText="Encoded">
          <JwtCode token={token} setToken={setToken} isEcoded={isEcoded} />
        </DebuggerContainer>

        <DebuggerContainer headerText="Decoded">
          <div className="decode-area">
            <JwtHeader header={header} setHeader={setHeader} />
            {isEcoded ? (
              <SingleTab tab={tab} setTab={setTab} />
            ) : (
              <MultiTab tab={tab} setTab={setTab} />
            )}
            <JwtPayload payload={tabValue[tab]} setPayload={tabHandler[tab]} />
            <JwtSigature
              secret={secret}
              setSecret={setSecret}
              checked={base64Checked}
              setChecked={setBase64Checked}
            />
          </div>
        </DebuggerContainer>
      </div>
    </div>
  );
};

interface TabProps {
  tab: string;
  setTab: React.Dispatch<
    React.SetStateAction<"claim" | "discloseFrame" | "discolsures">
  >;
}

CodeMirror.defineMode("jwt", function () {
  console.log("jwt code Mirror");
  return {
    token: function (stream, state) {
      if (stream.sol()) {
        state.partParsed = "header"; // Start of line, assume header
      }

      if (stream.eat(".") || stream.eat("~")) {
        // Consume and style the dot
        if (state.partParsed === "header") {
          state.partParsed = "payload";
        } else if (state.partParsed === "payload") {
          state.partParsed = "signature";
        } else if (state.partParsed === "signature") {
          state.partParsed = "after-signature"; // After the signature, no styling
        }
        return "jwt-dot";
      }

      stream.next(); // Consume the next character
      if (state.partParsed === "after-signature") {
        return "sdjwt-disclosure"; // No styling after the signature
      }
      return "jwt-" + state.partParsed; // Style based on the current part
    },
    startState: function () {
      return { partParsed: null };
    },
  };
});

const SingleTab = ({ tab, setTab }: TabProps) => (
  <div className="decode-header decode-border-top">
    <span
      className={tab === "discolsures" ? "decode-tab-active" : "decode-tab"}
      onClick={() => setTab("discolsures")}
    >
      {"Discolsures"}
    </span>
  </div>
);

const MultiTab = ({ tab, setTab }: TabProps) => (
  <div className="decode-header decode-border-top">
    <div className="payload-subhead">
      <span
        className={tab === "claim" ? "decode-tab-active" : "decode-tab"}
        style={{ borderRight: "1px solid #ccc", paddingRight: "1.25rem" }}
        onClick={() => setTab("claim")}
      >
        {"Claims"}
      </span>
      <span
        className={tab === "discloseFrame" ? "decode-tab-active" : "decode-tab"}
        onClick={() => setTab("discloseFrame")}
        style={{ paddingLeft: "1.25rem" }}
      >
        {"DiscloseFrames"}
      </span>
    </div>
  </div>
);
