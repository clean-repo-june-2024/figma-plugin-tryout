import * as Networker from "monorepo-networker";
import { Button } from "../components/ui/button";
import { useEffect, useRef } from "react";

const Dashboard = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.onmessage = ({ data: { pluginMessage } }) => {
      if (pluginMessage.type === "EXPORT_RESULT") {
        if(ref.current){
          ref.current.innerHTML = JSON.stringify(pluginMessage.data, null, 2);
        }
      }
    }
  }, []);

  return (
    <div>
      <div>Dashboard</div>
      <span>(Current logical side = {Networker.Side.current.getName()})</span>
      <Button
          onClick={() =>
            parent.postMessage({ pluginMessage: { type: "EXPORT" } }, "*")
          }
          style={{ marginInlineStart: 10 }}
        >
          create square
        </Button>
      <div ref={ref}>

      </div>
    </div>
  )
}

export default Dashboard;