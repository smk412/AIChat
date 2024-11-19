import { useEffect, useState } from "react";
import { Game, Engine } from "@gathertown/gather-game-client";
import "../css/Gathertown.css";

// Gather 공간 ID와 API 환경변수 호출
const { SPACE_ID, API_KEY } = require("../confing");

const Gathertown = ({ getMap, getUsers, getUser }) => {
  const [mapData, setMapData] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 기본 엔진 설정
  const engine = new Engine(SPACE_ID,API_KEY,"wss://ip-10-203-138-150.ap-northeast-1-a.prod.aws.gather.town:443/","https://api.gather.town");
  
  engine.onmetric = (metricName, metricValue) => {
    console.log(`Metric - ${metricName}:`, metricValue);
  };

  // Game 객체 생성
  const game = new Game(SPACE_ID, engine);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const mapRes = await getMap();
        const usersRes = await getUsers();
        setMapData(mapRes);
        setUsersData(usersRes);
        
        if (usersRes && usersRes.length > 0) {
          const userRes = await getUser(usersRes[0].id);
          setUserData(userRes);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getMap, getUsers, getUser]);

  // Gather 클라이언트 연결 설정
  useEffect(() => {
    const initGameConnection = async () => {
      try {
        await game.connect();
        
        game.on("connected", () => {
          console.log("Connected to Gather space!");
          
          if (userData) {
            sendMessage(userData.id, "Welcome to our Gather space!");
          }
        });

        game.on("disconnected", () => {
          console.log("Disconnected from Gather space.");
        });

        game.subscribeToEvent("playerMoves", (data, context) => {
          console.log("Player moved:", data);
        });
      } catch (error) {
        console.error("Connection error:", error);
      }
    };
    initGameConnection();

    return () => {
      game.disconnect();
      console.log("Disconnected from Gather space on unmount");
    };
  }, [game, userData]);

  const sendMessage = (playerId, message) => {
    game.chat(playerId, ["localPlayerId"], SPACE_ID, { contents: message });
  };

  const TILE_SIZE = 32;

  if (loading) {
    return (
      <div className="loading-modal">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="map-container">
      <div
        className="background"
        style={{
          backgroundImage: `url(${mapData.backgroundImagePath})`,
          width: mapData.dimensions[0] * TILE_SIZE,
          height: mapData.dimensions[1] * TILE_SIZE,
          margin: "0 auto",
        }}
      >
        {mapData.spawns.map((spawn, index) => (
          <div
            key={index}
            className="spawn-point"
            style={{
              left: spawn.x * TILE_SIZE,
              top: spawn.y * TILE_SIZE,
            }}
          />
        ))}

        {Object.keys(mapData.objects).map((key) => {
          const obj = mapData.objects[key];
          return (
            <img
              key={obj.id}
              src={obj.normal}
              alt={obj._name}
              className="map-object"
              style={{
                left: obj.x * TILE_SIZE,
                top: obj.y * TILE_SIZE,
                zIndex: obj.zIndex,
              }}
            />
          );
        })}

        {Object.values(mapData.nooks).map((nook, index) => (
          <div key={index} className="nook-area">
            {nook.nookCoords.coords.map((coord, coordIndex) => (
              <div
                key={coordIndex}
                className="nook-point"
                style={{
                  left: coord.x * TILE_SIZE,
                  top: coord.y * TILE_SIZE,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gathertown;
