import * as Networker from "monorepo-networker";
import { Button } from "../components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Heading } from "../components/ui/typoghraphy";
import ColorTokenCircle from "../components/colorTokenCircle";

const Dashboard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [variables, setVariables] = useState<any[]>([]);

  useEffect(() => {
    window.onmessage = ({ data: { pluginMessage } }) => {
      if (pluginMessage.type === "EXPORT_RESULT") {
        setVariables((prev) => [...prev, pluginMessage.data]);
      }
    };
  }, []);

  const collection = variables.reduce((acc, item) => {
    if (!acc[item.collection]) {
      acc[item.collection] = [];
    }
    acc[item.collection].push(item);
    return acc;
  }, {});

  // 'BOOLEAN' | 'COLOR' | 'FLOAT' | 'STRING'

  // const types = {
  //   'COLOR':
  // }

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
      <div ref={ref}></div>
      {Object.keys(collection).map((key) => {
        return (
          <div key={key}>
            <Heading as="h3">{key}</Heading>
            {collection[key].map((item, index) => {
              console.log("item", item);
              if (item.type === "COLOR") {
                const red = Math.round(item.values[item.defaultMode].r * 100);
                const green = Math.round(item.values[item.defaultMode].g * 100);
                const blue = Math.round(item.values[item.defaultMode].b * 100);
                const opacity = Math.round(
                  item.values[item.defaultMode].a * 100
                );

                return (
                  <div>
                    <div>{item.name}</div>
                    <ColorTokenCircle
                      key={index}
                      red={red}
                      green={green}
                      blue={blue}
                      opacity={opacity}
                    />
                  </div>
                );
              }


              if(item.type === "FLOAT" && item.collection === "spacings") {
                return (
                  <div key={index}>
                    {item.name}
                    <div>{item.values[item.defaultMode]}</div>
                    <div 
                      style={{width: item.values[item.defaultMode] * 8, 
                      height: item.values[item.defaultMode] * 8, 
                      backgroundColor: "red"}}
                    ></div>
                  </div>
                )
              }

              if( item.collection === "Typography") {
                if(item.type === "FLOAT") {
                  return (
                    <div key={index}>
                      <div>{item.name}</div>
                      <div style={{fontSize:item.values[item.defaultMode]}} >lorem ipsum</div>
                    </div>
                  )
                }

                if(item.type === "STRING") {
                  return (
                    <div key={index}>
                      <div>{item.name}</div>
                      <div style={{fontFamily:item.values[item.defaultMode]}} >lorem ipsum</div>
                    </div>
                  )
                }
              }

              return (
                <div key={index}>
                  {item.name}
                  <div>{JSON.stringify(item.values, null, 2)}</div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
