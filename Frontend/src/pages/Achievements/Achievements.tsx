import { CircularProgress } from "@mui/material";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import Badge from "~/components/Badge/Badge";
import { abi } from "./../../components/ContractReader/contractABI";
import WorldID from "./../../components/WorldID/worldID";
import "./Achievements.css";

type Stats = any;

type Track = {
  colors: {
    rim: string;
    ribbon: string[];
    gradient: string[];
  };
  achievements: Achievement[];
};

type Achievement = {
  icon: string;
  description: string;
  done: (stats: Stats) => boolean;
  progress: (stats: Stats) => string;
  data: (stats: Stats) => [string, number];
};

const statsQueryFn = async (account_id?: string) => {
  account_id = "0xd3d2E2692501A5c9Ca623199D38826e513033a17";

  const API_KEY = import.meta.env.VITE_ES_API_KEY;

  if (!account_id) return Promise.reject();

  return await Promise.all([
    fetch(
      `https://eth.blockscout.com/api/v2/addresses/${account_id}/tokens?type=ERC-20`
    ),
    fetch(
      `https://eth.blockscout.com/api/v2/addresses/${account_id}/tokens?type=ERC-721`
    ),
    fetch(`https://eth.blockscout.com/api/v2/addresses/${account_id}/counters`),
    fetch(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${account_id}&startblock=0&endblock=99999999&page=1&offset=1&sort=asc&apikey=${API_KEY}`
    ),
  ]).then((responses) =>
    Promise.all(responses.map((response) => response.json()))
  );
};

const tracks: Record<string, Track> = {
  holding_fts: {
    colors: {
      rim: "#FF9696",
      ribbon: ["#F84242", "#F23737"],
      gradient: ["#FF6161", "#FAEDED"],
    },
    achievements: [
      {
        icon: "counter_1",
        description: "Hold 1 or more fungible tokens",
        done: (stats: Stats) => Object.keys(stats[0].items).length > 1,
        progress: (stats: Stats) => `${Object.keys(stats[0].items).length} / 1`,
        data: (stats: Stats) => [
          "holding_fts",
          Object.keys(stats[0].items).length,
        ],
      },
      {
        icon: "counter_5",
        description: "Hold 5 or more fungible tokens",
        done: (stats: Stats) => Object.keys(stats[0].items).length > 5,
        progress: (stats: Stats) => `${Object.keys(stats[0].items).length} / 5`,
        data: (stats: Stats) => [
          "holding_fts",
          Object.keys(stats[0].items).length,
        ],
      },
    ],
  },
  holding_nfts: {
    colors: {
      rim: "#9696FF",
      ribbon: ["#4242F8", "#3737F2"],
      gradient: ["#6161FF", "#EDEDFA"],
    },
    achievements: [
      {
        icon: "timer_5_shutter",
        description: "Hold 5 or more NFTs",
        done: (stats: Stats) => Object.keys(stats[1].items).length > 5,
        progress: (stats: Stats) => `${Object.keys(stats[1].items).length} / 5`,
        data: (stats: Stats) => [
          "holding_nfts",
          Object.keys(stats[1].items).length,
        ],
      },
      {
        icon: "timer_10",
        description: "Hold 10 or more NFTs",
        done: (stats: Stats) => Object.keys(stats[1].items).length > 10,
        progress: (stats: Stats) =>
          `${Object.keys(stats[1].items).length} / 10`,
        data: (stats: Stats) => [
          "holding_nfts",
          Object.keys(stats[1].items).length,
        ],
      },
    ],
  },
  txs_sent: {
    colors: {
      rim: "#96FF96",
      ribbon: ["#42F842", "#37F237"],
      gradient: ["#61FF61", "#EDFAED"],
    },
    achievements: [
      {
        icon: "1k",
        description: "Send 1.000 transactions",
        done: (stats: Stats) => stats[2].transactions_count > 1000,
        progress: (stats: Stats) => `${stats[2].transactions_count} / 1k`,
        data: (stats: Stats) => ["txs_sent", stats[2].transactions_count],
      },
      {
        icon: "10k",
        description: "Send 10.000 transactions",
        done: (stats: Stats) => stats[2].transactions_count > 10000,
        progress: (stats: Stats) => `${stats[2].transactions_count} / 10k`,
        data: (stats: Stats) => ["txs_sent", stats[2].transactions_count],
      },
    ],
  },
  age: {
    colors: {
      rim: "#FF96FB",
      ribbon: ["#DE42F8", "#B637F2"],
      gradient: ["#FF61EF", "#FAEDF7"],
    },
    achievements: [
      {
        icon: "fork_right",
        description: "Been around when Ethereum switched to POS.",
        done: (stats: Stats) =>
          new Date(stats[3].result[0].timeStamp * 1000) <=
          new Date("2022-09-15"),
        progress: (stats: Stats) =>
          `Wallet created: ${new Date(
            stats[3].result[0].timeStamp * 1000
          ).toLocaleDateString()}`,
        data: (stats: Stats) => [
          "age",
          stats[3].result[0].timeStamp - Date.now(),
        ],
      },
      {
        icon: "coronavirus",
        description: "Been around when covid was a thing",
        done: (stats: Stats) =>
          new Date(stats[3].result[0].timeStamp * 1000) <=
          new Date("2022-01-01"),
        progress: (stats: Stats) =>
          `Wallet created: ${new Date(
            stats[3].result[0].timeStamp * 1000
          ).toLocaleDateString()}`,
        data: (stats: Stats) => [
          "age",
          stats[3].result[0].timeStamp - Date.now(),
        ],
      },
    ],
  },
  is_human: {
    colors: {
      rim: "#FFB596",
      ribbon: ["#F86E42", "#F25837"],
      gradient: ["#FF7D61", "#FAF2ED"],
    },
    achievements: [
      {
        icon: "man",
        description: "Verified that you are a human",
        done: (stats: Stats) => false,
        progress: (stats: Stats) => `0 / 1`,
        data: (stats: Stats) => ["is_human", 1],
      },
    ],
  },
};

async function pushDataToBlockchain(
  address: string,
  id: string,
  value: number
) {
  const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY;
  const INFURA_API_KEY = import.meta.env.VITE_INFURA_API_KEY;
  const provider = new ethers.providers.JsonRpcProvider(
    `https://sepolia.infura.io/v3/${INFURA_API_KEY}`
  );
  const walletM = new ethers.Wallet(PRIVATE_KEY, provider);
  const contract = new ethers.Contract(
    "0x4F8757c55FCdf2Bc7834dF7134BFB0906cfFc35A",
    abi,
    provider
  );
  const signer = contract.connect(walletM);

  const gasPrice = await provider.getGasPrice();
  const overrides = {
    maxFeePerGas: gasPrice.mul(2), // set max fee per gas as twice the current gas price
    maxPriorityFeePerGas: gasPrice.div(2), // set max priority fee per gas as half the current gas price
  };
  const result = await signer.storeData(address, id, value);
  console.log("Data stored to blockchain: ", result);
  return `https://eth-sepolia.blockscout.com/tx/${result.hash}`;
}

export default function Achievements() {
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState(null);
  const { address } = useAccount();
  const statsQuery = useQuery({
    queryFn: () => statsQueryFn(address),
    queryKey: ["stats-query"],
  });
  useEffect(() => {
    console.log("done");
  }, []);

  return (
    <div className="achievements-page">
      {!!address && (
        <>
          <div className="title">Your Achievements</div>
          <div className="achievements-container">
            {statsQuery.status === "loading" && <CircularProgress />}
            {statsQuery.status === "error" && (
              <p>{"Something went wrong :("}</p>
            )}
            {statsQuery.status === "success" &&
              Object.values(tracks)
                .map((t: Track, i) => {
                  const as = [];

                  for (const a of t.achievements) {
                    as.push(a);
                    if (!a.done(statsQuery.data)) break;
                  }

                  return as.map((a, j) => (
                    <div
                      className="achievement-infos"
                      data-disabled={!a.done(statsQuery.data)}
                      key={i.toString() + "_" + j.toString()}
                    >
                      <Badge
                        className={`achievement ${
                          a.done(statsQuery.data) ? "" : "grayscale"
                        }`}
                        id={i.toString()}
                        colors={t.colors}
                      >
                        <span className="material-symbols-outlined achievement-icon">
                          {a.icon}
                        </span>
                      </Badge>
                      <strong className="progress">
                        {a.progress(statsQuery.data)}
                      </strong>
                      <div className="description">{a.description}</div>
                      <div className="pane"></div>
                      <button
                        onClick={() => {
                          if (!!link) {
                            window.open(link, "_blank")!.focus();
                            return;
                          }
                          setLoading(true);
                          pushDataToBlockchain(
                            address,
                            ...a.data(statsQuery.data)
                          ).then((res) => {
                            setLoading(false);
                            setLink(res);
                          });
                        }}
                      >
                        {!link && !loading && (
                          <div className="button">
                            <span className="material-symbols-outlined">
                              publish
                            </span>
                            <p>push to blockchain</p>
                          </div>
                        )}
                        {!!link && !loading && (
                          <div className="button">
                            <span className="material-symbols-outlined">
                              open_in_new
                            </span>
                            <p>view transaction</p>
                          </div>
                        )}
                        {loading && (
                          <div className="button">
                            <CircularProgress />
                          </div>
                        )}
                      </button>
                    </div>
                  ));
                })
                .flat()}
          </div>
          <WorldID />
          <Link to="/"> Go Home </Link>
        </>
      )}
    </div>
  );
}
