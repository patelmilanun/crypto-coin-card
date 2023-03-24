import { useEffect, useState } from "react";
import bnb from "./assets/bnb.svg";
import eth from "./assets/eth.svg";
import shib from "./assets/shib.svg";
import sol from "./assets/sol.svg";
import bsv from "./assets/bsv.svg";
import activity from "./assets/activity.svg";
// used this library to sample image and create matching gradient
import { prominent } from "color.js";

// possible backend response
const response = [
  {
    id: 1,
    name: "Bitcoin (BTC)",
    icon: bsv,
    price: { currency: "$", value: 31812.8, change: 10, profitable: true },
    tvl: { currency: "$", value: 60000 },
    pairs: [
      { id: 1, name: "SOL", icon: sol },
      { id: 2, name: "ETH", icon: eth },
      { id: 3, name: "BNB", icon: bnb },
    ],
  },
  {
    id: 2,
    name: "Solana (SOL)",
    icon: sol,
    price: { currency: "$", value: 32.83, change: -12.32, profitable: false },
    tvl: { currency: "$", value: 60000 },
    pairs: [
      { id: 1, name: "BSV", icon: bsv },
      { id: 2, name: "ETH", icon: eth },
      { id: 3, name: "BNB", icon: bnb },
    ],
  },
  {
    id: 3,
    name: "Ethereum (ETH)",
    icon: eth,
    price: { currency: "$", value: 1466.45, change: -11.93, profitable: false },
    tvl: { currency: "$", value: 60000 },
    pairs: [
      { id: 1, name: "SOL", icon: sol },
      { id: 2, name: "BTC", icon: bsv },
      { id: 3, name: "BNB", icon: bnb },
    ],
  },
  {
    id: 4,
    name: "Binance USD (BUSD)",
    icon: bnb,
    price: { currency: "$", value: 1, change: 0.26, profitable: true },
    tvl: { currency: "$", value: 60000 },
    pairs: [
      { id: 1, name: "SOL", icon: sol },
      { id: 2, name: "ETH", icon: eth },
      { id: 3, name: "BNB", icon: bnb },
    ],
  },
  {
    id: 5,
    name: "Shiba Inu (SHIB)",
    icon: shib,
    price: {
      currency: "$",
      value: 0.00000001948,
      change: -8.1,
      profitable: false,
    },
    tvl: { currency: "$", value: 60000 },
    pairs: [
      { id: 1, name: "SOL", icon: sol },
      { id: 2, name: "ETH", icon: eth },
      { id: 3, name: "BNB", icon: bnb },
    ],
  },
];

// function to find gradient from the image and return
const processGradient = async (img: string) => {
  let gradientEndColor: Array<number> = [];
  const colors = await prominent(img, { group: 114 });
  for (let i = 0; i < colors.length; i++) {
    const currentColor = colors.at(i);
    if ((currentColor as Array<number>).join("") !== "000") {
      gradientEndColor = currentColor as Array<number>;
      break;
    }
  }

  return `${gradientEndColor.join(",")}, 0.1`; // example return value 255, 45, 68, 0.1
};

type Coin = (typeof response)[0] & { gradient: string };

function App() {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    // to iterate through and add gradient to response
    const coinWithGradient = response.map(async (coin) => {
      const gradient = await processGradient(coin.icon);
      return {
        ...coin,
        gradient,
      };
    });
    Promise.all(coinWithGradient).then((coins) => {
      setCoins(coins);
    });
  }, []);

  if (coins.length === 0) return null;

  const dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 11,
  });

  const change = Intl.NumberFormat("en-US", { signDisplay: "exceptZero" });

  const tvlDollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return (
    <div className="flex h-full min-h-screen items-center bg-[#14172B] py-20">
      <div className="container mx-auto flex flex-col gap-28 px-10 2xl:max-w-[1907px]">
        <div className="flex gap-3">
          <img src={activity} className="" alt="activity icon" />
          <span className="text-[#ECF0FF]">Trending Assets</span>
        </div>
        <div className="flex flex-wrap gap-20 bg-[#14172B]">
          {coins.map((coin) => (
            <div
              key={coin.id}
              className="card relative grid h-[350px] w-[290px] gap-4 rounded-3xl border border-transparent pb-3 text-center text-white"
            >
              <div className="absolute inset-0">
                <svg width="100%" height="100%">
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="rgba(236, 240, 255, 0.1)" />
                      <stop offset="25%" stopColor="rgba(236, 240, 255, 0.1)" />
                      <stop offset="100%" stopColor="rgba(46, 49, 73, 0)" />
                    </linearGradient>
                  </defs>
                  <rect
                    x="0"
                    y="0"
                    width="calc(100% - 1px)"
                    height="calc(100% - 1px)"
                    rx="24"
                    fillOpacity="0"
                    strokeWidth="1"
                    strokeLinejoin="round"
                    stroke="url(#gradient)"
                  />
                </svg>
              </div>

              <div className="flex justify-center">
                <div className="curve relative h-16 w-32 rounded-br-full rounded-bl-full bg-[#14172B] shadow-[0px_1px_0px_0px_rgba(236_240_255/0.1)] before:absolute before:top-0  before:-left-8 before:h-14 before:w-10 before:rounded-tr-full before:shadow-[15px_-48px_0_15px_#14172B] after:absolute after:top-0 after:-right-8 after:h-14 after:w-10 after:rounded-tl-full after:bg-transparent  after:shadow-[-15px_-48px_0_15px_#14172B]">
                  <div
                    // need to use style here as tailwind doesn't support dynamic string
                    style={{
                      backgroundImage: `linear-gradient(to bottom, rgba(98, 106, 136, 0.1), rgb(${coin.gradient}))`,
                    }}
                    className="absolute left-1/2 -top-3/4 z-10 box-content flex h-24 w-24 -translate-x-1/2 items-center justify-center rounded-full"
                  >
                    <img
                      src={coin.icon}
                      className=""
                      alt={`${coin.name} icon`}
                      height={48}
                      width={48}
                    />
                  </div>
                </div>
              </div>
              <span className="text-xs text-[#737BAE]">{coin.name}</span>
              <div className="">
                <span className="element-shadow relative mx-5 flex justify-center rounded-3xl border border-transparent bg-[#14172B] py-2 text-[#ECF0FF]">
                  {dollarUS.format(coin.price.value)}
                  <span
                    className={`absolute top-1/2 right-3 -translate-y-1/2 text-xs ${
                      coin.price.change < 0
                        ? "text-[#FF4D4D]"
                        : "text-[#00FFA3]"
                    } `}
                  >
                    {`${change.format(coin.price.change)}%`}
                  </span>
                </span>
                <span className="text-xs text-[#5A5F7D]">Price</span>
              </div>
              <div className="grid gap-1">
                <span className="element-shadow mx-5 rounded-3xl bg-[#14172B] py-2 text-[#ECF0FF]">
                  {tvlDollarUS.format(coin.tvl.value)}
                </span>
                <span className="text-xs text-[#5A5F7D]">tvl</span>
              </div>
              <div className="mx-auto">
                <div className="flex justify-center gap-3 rounded-3xl bg-[#14172B] px-3 py-2">
                  {coin.pairs.map((pair) => (
                    <img
                      key={pair.id}
                      src={pair.icon}
                      className=""
                      alt={`${pair.name} icon`}
                      height={22}
                      width={22}
                    />
                  ))}
                </div>
                <span className="text-xs text-[#5A5F7D]">Popular pairs</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
