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
import Button from "./common/Button";
import { DebuggerContainer } from "./DebuggerContainer";

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

  const [tab, setTab] = useState<"claim" | "discloseFrame" | "discolsures">(
    "claim"
  );

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

    // If the "token" parameter exists, use it as the initial state
    if (tokenParam) {
      setToken(tokenParam);
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

      <div className="code-wrapper">
        <DebuggerContainer headerText="Encoded">
          <JwtCode token={token} setToken={setToken} />
        </DebuggerContainer>
        <DebuggerContainer headerText="Decoded">
          <div className="decode-area">
            <JwtHeader header={header} setHeader={setHeader} />
            <Tabs tab={tab} setTab={setTab} />
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

      <div className="verified-share-wrapper">
        <Button onClick={() => encode()}>Encode SD JWT</Button>
        <Button onClick={() => decode()}>Decode SD JWT</Button>
        <Button onClick={() => verify()}>Verify Signature</Button>
        <Button
          onClick={async () => {
            updateURLWithQuery(`token=${token}`);
            const result = await copyCurrentURLToClipboard();
            if (result) message.success("URL is copied to your clipboard", 2);
          }}
          className="subdue"
          style={{ background: "transparent" }}
        >
          Share SD JWT
        </Button>
      </div>
    </div>
  );
};

interface TabProps {
  tabName: string;
  isActive: boolean;
  setTab: any;
  children: ReactNode;
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

const Tab = ({ tabName, isActive, setTab, children }: TabProps) => (
  <span
    className={isActive ? "decode-tab-active" : "decode-tab"}
    onClick={() => setTab(tabName)}
  >
    {children}
  </span>
);

const Tabs = ({ tab, setTab }: any) => (
  <div className="decode-header decode-border-top">
    <Tab
      tabName="claim"
      isActive={tab === "claim"}
      setTab={() => setTab("discloseFrame")}
    >
      Claims
    </Tab>
    <Tab
      tabName="discloseFrame"
      isActive={tab === "discloseFrame"}
      setTab={() => setTab("discolsures")}
    >
      DiscloseFrames
    </Tab>
    <Tab
      tabName="discolsures"
      isActive={tab === "discolsures"}
      setTab={() => setTab("discolsures")}
    >
      Discolsure
    </Tab>
  </div>
);
