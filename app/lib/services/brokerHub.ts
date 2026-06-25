import { Broker } from "../../types";

const BROKER_HUB_SEED = [
  { id: "apex-prime", name: "ApexPrime Markets", logo: "📈", rating: 4.7, established: 2012, minDeposit: 100, maxLeverage: "1:500", spreadsFrom: "0.1 pips", regulatedBy: ["FCA (UK)", "ASIC (Australia)", "CySEC (Cyprus)"], platforms: ["MT4", "MT5", "cTrader"], usClients: false },
  { id: "titan-pro", name: "Titan FX Pro", logo: "🛡️", rating: 4.6, established: 2015, minDeposit: 200, maxLeverage: "1:1000", spreadsFrom: "0.0 pips", regulatedBy: ["ASIC (Australia)", "FSA (Seychelles)"], platforms: ["MT4", "MT5", "TradingView"], usClients: false },
  { id: "saxo-prime", name: "Saxo Prime Select", logo: "🏛️", rating: 4.5, established: 1992, minDeposit: 500, maxLeverage: "1:30", spreadsFrom: "0.4 pips", regulatedBy: ["FCA (UK)", "FINMA (Switzerland)", "MAS (Singapore)"], platforms: ["SaxoTraderGO", "SaxoTraderPro"], usClients: false },
  { id: "pepperstone", name: "Pepperstone Group", logo: "🦘", rating: 4.6, established: 2010, minDeposit: 200, maxLeverage: "1:500", spreadsFrom: "0.0 pips", regulatedBy: ["FCA (UK)", "ASIC (Australia)", "BaFin (Germany)"], platforms: ["MT4", "MT5", "cTrader", "TradingView"], usClients: false },
  { id: "oanda", name: "OANDA Corporation", logo: "🗺️", rating: 4.4, established: 1996, minDeposit: 10, maxLeverage: "1:50", spreadsFrom: "0.6 pips", regulatedBy: ["NFA (US)", "FCA (UK)", "ASIC (Australia)"], platforms: ["OANDA Trade", "MT4", "TradingView"], usClients: true },
  { id: "ig-markets", name: "IG Prime", logo: "🦁", rating: 4.5, established: 1974, minDeposit: 250, maxLeverage: "1:30", spreadsFrom: "0.6 pips", regulatedBy: ["FCA (UK)", "ASIC (Australia)", "BaFin (Germany)"], platforms: ["IG Platform", "MT4", "L2 Dealer"], usClients: false },
  { id: "interactive-brokers", name: "Interactive Brokers", logo: "🎯", rating: 4.6, established: 1977, minDeposit: 0, maxLeverage: "1:50", spreadsFrom: "0.1 pips", regulatedBy: ["SEC (US)", "FINRA (US)", "FCA (UK)"], platforms: ["Trader Workstation", "IBKR Mobile", "Client Portal"], usClients: true },
  { id: "swissquote", name: "Swissquote Bank", logo: "🇨🇭", rating: 4.2, established: 1996, minDeposit: 1000, maxLeverage: "1:100", spreadsFrom: "0.8 pips", regulatedBy: ["FINMA (Switzerland)", "FCA (UK)"], platforms: ["Advanced Trader", "MT4", "MT5"], usClients: false },
  { id: "ic-markets", name: "IC Markets Global", logo: "📊", rating: 4.6, established: 2007, minDeposit: 200, maxLeverage: "1:500", spreadsFrom: "0.0 pips", regulatedBy: ["ASIC (Australia)", "CySEC (Cyprus)", "FSA (Seychelles)"], platforms: ["MT4", "MT5", "cTrader", "TradingView"], usClients: false },
  { id: "fp-markets", name: "FP Markets", logo: "⚓", rating: 4.4, established: 2005, minDeposit: 100, maxLeverage: "1:500", spreadsFrom: "0.0 pips", regulatedBy: ["ASIC (Australia)", "CySEC (Cyprus)"], platforms: ["MT4", "MT5", "cTrader", "Iress"], usClients: false },
  { id: "avatrade", name: "AvaTrade Prime", logo: "🍀", rating: 4.3, established: 2006, minDeposit: 100, maxLeverage: "1:400", spreadsFrom: "0.9 pips", regulatedBy: ["Central Bank of Ireland", "ASIC (Australia)", "FSA (Japan)"], platforms: ["AvaTradeGO", "MT4", "MT5", "DupliTrade"], usClients: false },
  { id: "xtb", name: "XTB Professional", logo: "🦅", rating: 4.4, established: 2002, minDeposit: 0, maxLeverage: "1:500", spreadsFrom: "0.5 pips", regulatedBy: ["FCA (UK)", "KNF (Poland)", "CySEC (Cyprus)"], platforms: ["xStation 5", "MT4"], usClients: false },
  { id: "tickmill", name: "Tickmill Group", logo: "⚙️", rating: 4.3, established: 2014, minDeposit: 100, maxLeverage: "1:500", spreadsFrom: "0.1 pips", regulatedBy: ["FCA (UK)", "CySEC (Cyprus)", "FSA (Seychelles)"], platforms: ["MT4", "MT5"], usClients: false },
  { id: "admirals", name: "Admirals Global", logo: "⚓", rating: 4.4, established: 2001, minDeposit: 100, maxLeverage: "1:500", spreadsFrom: "0.5 pips", regulatedBy: ["FCA (UK)", "CySEC (Cyprus)", "ASIC (Australia)"], platforms: ["MT4", "MT5", "Admirals App"], usClients: false },
  { id: "plus500", name: "Plus500 Pro", logo: "🔄", rating: 4.1, established: 2008, minDeposit: 100, maxLeverage: "1:30", spreadsFrom: "0.8 pips", regulatedBy: ["FCA (UK)", "ASIC (Australia)", "CySEC (Cyprus)"], platforms: ["Plus500 Platform"], usClients: false },
  { id: "eightcap", name: "Eightcap Systematic", logo: "♾️", rating: 4.2, established: 2015, minDeposit: 100, maxLeverage: "1:500", spreadsFrom: "0.0 pips", regulatedBy: ["ASIC (Australia)", "FCA (UK)", "SCB (Bahamas)"], platforms: ["MT4", "MT5", "TradingView"], usClients: false },
  { id: "vantage", name: "Vantage Markets", logo: "⚡", rating: 4.3, established: 2009, minDeposit: 50, maxLeverage: "1:500", spreadsFrom: "0.0 pips", regulatedBy: ["ASIC (Australia)", "FCA (UK)", "VFSC (Vanuatu)"], platforms: ["MT4", "MT5", "Vantage App"], usClients: false },
  { id: "blackbull", name: "BlackBull Markets", logo: "🐂", rating: 4.2, established: 2014, minDeposit: 0, maxLeverage: "1:500", spreadsFrom: "0.0 pips", regulatedBy: ["FMA (New Zealand)", "FSA (Seychelles)"], platforms: ["MT4", "MT5", "cTrader", "TradingView"], usClients: false },
  { id: "keytomarkets", name: "KeyToMarkets", logo: "🔑", rating: 4.1, established: 2010, minDeposit: 100, maxLeverage: "1:500", spreadsFrom: "0.6 pips", regulatedBy: ["FCA (UK)", "DMCC (Dubai)"], platforms: ["MT4", "MT5"], usClients: false },
  { id: "lmax", name: "LMAX Exchange Group", logo: "🛸", rating: 4.3, established: 2010, minDeposit: 10000, maxLeverage: "1:100", spreadsFrom: "0.0 pips", regulatedBy: ["FCA (UK)", "CySEC (Cyprus)", "MAS (Singapore)"], platforms: ["LMAX API", "MT4/MT5 Bridge"], usClients: false },
  { id: "fxcm", name: "FXCM Professional", logo: "💠", rating: 4.0, established: 1999, minDeposit: 50, maxLeverage: "1:400", spreadsFrom: "0.8 pips", regulatedBy: ["FCA (UK)", "ASIC (Australia)"], platforms: ["Trading Station", "MT4", "NinjaTrader"], usClients: false },
  { id: "dukascopy", name: "Dukascopy Bank", logo: "🎖️", rating: 4.2, established: 2004, minDeposit: 100, maxLeverage: "1:200", spreadsFrom: "0.3 pips", regulatedBy: ["FINMA (Switzerland)"], platforms: ["JForex", "MT4"], usClients: false },
  { id: "axicorp", name: "Axi Trader", logo: "🅰️", rating: 4.1, established: 2007, minDeposit: 0, maxLeverage: "1:500", spreadsFrom: "0.1 pips", regulatedBy: ["ASIC (Australia)", "FCA (UK)", "DFSA (Dubai)"], platforms: ["MT4", "MT5", "TradingView"], usClients: false },
  { id: "cmc", name: "CMC Markets Connect", logo: "🌀", rating: 4.0, established: 1989, minDeposit: 0, maxLeverage: "1:30", spreadsFrom: "0.3 pips", regulatedBy: ["FCA (UK)", "ASIC (Australia)", "BaFin (Germany)"], platforms: ["Next Generation", "MT4"], usClients: false },
  { id: "fxpro", name: "FxPro Group", logo: "⭐", rating: 4.1, established: 2006, minDeposit: 100, maxLeverage: "1:500", spreadsFrom: "0.3 pips", regulatedBy: ["FCA (UK)", "CySEC (Cyprus)", "FSCA (South Africa)"], platforms: ["MT4", "MT5", "cTrader", "FxPro Platform"], usClients: false },
  { id: "exness", name: "Exness Global", logo: "✂️", rating: 4.4, established: 2008, minDeposit: 1, maxLeverage: "1:2000", spreadsFrom: "0.0 pips", regulatedBy: ["FCA (UK)", "CySEC (Cyprus)", "FSCA (South Africa)"], platforms: ["MT4", "MT5", "Web Trader"], usClients: false },
  { id: "xm", name: "XM Global", logo: "🌐", rating: 4.3, established: 2009, minDeposit: 5, maxLeverage: "1:888", spreadsFrom: "0.1 pips", regulatedBy: ["CySEC (Cyprus)", "ASIC (Australia)", "IFSC (Belize)"], platforms: ["MT4", "MT5"], usClients: false },
  { id: "hotforex", name: "HFM / HotForex", logo: "🔥", rating: 4.0, established: 2010, minDeposit: 5, maxLeverage: "1:1000", spreadsFrom: "0.0 pips", regulatedBy: ["FCA (UK)", "CySEC (Cyprus)", "FSCA (South Africa)"], platforms: ["MT4", "MT5", "HF App"], usClients: false },
  { id: "fbs", name: "FBS Trader", logo: "💎", rating: 4.0, established: 2009, minDeposit: 1, maxLeverage: "1:3000", spreadsFrom: "0.5 pips", regulatedBy: ["CySEC (Cyprus)", "FSA (Seychelles)"], platforms: ["MT4", "MT5", "FBS Trader"], usClients: false },
  { id: "octafx", name: "OCTAFX", logo: "🐙", rating: 4.1, established: 2011, minDeposit: 5, maxLeverage: "1:500", spreadsFrom: "0.0 pips", regulatedBy: ["FCA (UK)", "CySEC (Cyprus)", "FSA (Seychelles)"], platforms: ["MT4", "MT5", "OCTAFX App"], usClients: false },
  { id: "roboforex", name: "RoboForex Prime", logo: "🤖", rating: 4.0, established: 2009, minDeposit: 10, maxLeverage: "1:2000", spreadsFrom: "0.0 pips", regulatedBy: ["IFSC (Belize)", "FSA (Seychelles)"], platforms: ["MT4", "MT5", "cTrader"], usClients: false },
  { id: "fxopen", name: "FXOpen Global", logo: "🌊", rating: 4.0, established: 2005, minDeposit: 1, maxLeverage: "1:500", spreadsFrom: "0.2 pips", regulatedBy: ["ASIC (Australia)", "FCA (UK)", "FSA (Seychelles)"], platforms: ["MT4", "MT5", "FxOpen Trader"], usClients: false },
  { id: "gkfx", name: "GKFX Prime", logo: "🟦", rating: 4.0, established: 2010, minDeposit: 100, maxLeverage: "1:500", spreadsFrom: "0.3 pips", regulatedBy: ["FCA (UK)", "ASIC (Australia)", "CySEC (Cyprus)"], platforms: ["MT4", "MT5", "TradingView"], usClients: false },
  { id: "city-index", name: "City Index Markets", logo: "🏙️", rating: 4.0, established: 1983, minDeposit: 0, maxLeverage: "1:30", spreadsFrom: "0.4 pips", regulatedBy: ["FCA (UK)", "ASIC (Australia)", "MAS (Singapore)"], platforms: ["Web Trader", "MT4"], usClients: false },
  { id: "hycm", name: "HYCM Global", logo: "🎯", rating: 4.0, established: 1977, minDeposit: 100, maxLeverage: "1:500", spreadsFrom: "0.2 pips", regulatedBy: ["FCA (UK)", "CySEC (Cyprus)", "DFSA (Dubai)"], platforms: ["MT4", "MT5", "HYCM App"], usClients: false },
  { id: "forexdotcom", name: "FOREX.com", logo: "🌍", rating: 4.3, established: 2001, minDeposit: 100, maxLeverage: "1:50", spreadsFrom: "0.8 pips", regulatedBy: ["NFA (US)", "FCA (UK)", "ASIC (Australia)"], platforms: ["FOREX.com platform", "MT4", "TradingView"], usClients: true },
  { id: "fxview", name: "FXView FX", logo: "👁️", rating: 3.9, established: 2008, minDeposit: 50, maxLeverage: "1:500", spreadsFrom: "0.3 pips", regulatedBy: ["ASIC (Australia)", "FCA (UK)", "FSA (Seychelles)"], platforms: ["MT4", "MT5", "WebTrader"], usClients: false },
  { id: "hantec-markets", name: "Hantec Markets", logo: "🏦", rating: 3.9, established: 1990, minDeposit: 100, maxLeverage: "1:500", spreadsFrom: "0.3 pips", regulatedBy: ["FSA (Seychelles)", "FSC (Vanuatu)"], platforms: ["MT4", "MT5", "Hantec App"], usClients: false },
  { id: "litefinance", name: "LiteFinance", logo: "💡", rating: 3.9, established: 2005, minDeposit: 10, maxLeverage: "1:500", spreadsFrom: "0.2 pips", regulatedBy: ["FCA (UK)", "CySEC (Cyprus)", "FSA (Belize)"], platforms: ["MT4", "MT5", "LiteFinance App"], usClients: false },
  { id: "easy-markets", name: "easyMarkets", logo: "🟢", rating: 4.1, established: 2001, minDeposit: 25, maxLeverage: "1:400", spreadsFrom: "0.5 pips", regulatedBy: ["ASIC (Australia)", "CySEC (Cyprus)", "FSC (BVI)"], platforms: ["easyMarkets platform", "MT4"], usClients: false },
  { id: "activtrades", name: "ActivTrades", logo: "⚡", rating: 4.2, established: 2001, minDeposit: 0, maxLeverage: "1:500", spreadsFrom: "0.2 pips", regulatedBy: ["FCA (UK)", "CSSF (Luxembourg)", "SFC (Hong Kong)"], platforms: ["MetaTrader 4", "MetaTrader 5", "ActivTrader"], usClients: false },
  { id: "orbex", name: "Orbex Prime", logo: "🪐", rating: 3.9, established: 2007, minDeposit: 100, maxLeverage: "1:500", spreadsFrom: "0.2 pips", regulatedBy: ["CySEC (Cyprus)", "SCB (Bahamas)"], platforms: ["MT4", "MT5", "TradingView"], usClients: false },
  { id: "fxprimus", name: "FXPrimus", logo: "⚜️", rating: 3.9, established: 2008, minDeposit: 100, maxLeverage: "1:500", spreadsFrom: "0.2 pips", regulatedBy: ["CySEC (Cyprus)", "ASIC (Australia)", "FSA (Seychelles)"], platforms: ["MT4", "MT5", "FXPrimus App"], usClients: false },
  { id: "ironfx", name: "IronFX", logo: "🔩", rating: 3.8, established: 2010, minDeposit: 100, maxLeverage: "1:500", spreadsFrom: "0.3 pips", regulatedBy: ["CySEC (Cyprus)", "FSCA (South Africa)", "ASIC (Australia)"], platforms: ["MT4", "MT5", "WebTrader"], usClients: false },
  { id: "alpari", name: "Alpari Global", logo: "🅰️", rating: 3.8, established: 1998, minDeposit: 5, maxLeverage: "1:1000", spreadsFrom: "0.4 pips", regulatedBy: ["FCA (UK)", "FSC (St. Vincent)", "IFSC (Belize)"], platforms: ["MT4", "MT5", "Alpari App"], usClients: false },
  { id: "fxchoice", name: "FXChoice", logo: "💼", rating: 3.9, established: 2010, minDeposit: 50, maxLeverage: "1:500", spreadsFrom: "0.1 pips", regulatedBy: ["FSC (Belize)", "FSA (Seychelles)"], platforms: ["MT4", "MT5"], usClients: false },
  { id: "capitalcom", name: "Capital.com", logo: "💼", rating: 4.0, established: 2016, minDeposit: 20, maxLeverage: "1:200", spreadsFrom: "0.5 pips", regulatedBy: ["FCA (UK)", "CySEC (Cyprus)", "ASIC (Australia)"], platforms: ["Capital.com platform", "MT4"], usClients: false },
  { id: "globalprime", name: "Global Prime", logo: "🌎", rating: 4.1, established: 2010, minDeposit: 0, maxLeverage: "1:500", spreadsFrom: "0.0 pips", regulatedBy: ["ASIC (Australia)", "FCA (UK)", "CySEC (Cyprus)"], platforms: ["MT4", "MT5", "TradingView"], usClients: false },
  { id: "nextmarkets", name: "NextMarkets", logo: "➡️", rating: 3.9, established: 2014, minDeposit: 0, maxLeverage: "1:30", spreadsFrom: "0.6 pips", regulatedBy: ["BaFin (Germany)", "FCA (UK)"], platforms: ["NextMarkets platform"], usClients: false },
  { id: "tradeview-markets", name: "Tradeview Markets", logo: "📈", rating: 4.0, established: 2004, minDeposit: 100, maxLeverage: "1:500", spreadsFrom: "0.0 pips", regulatedBy: ["CIMA (Cayman)", "FCA (UK)", "ASIC (Australia)"], platforms: ["cTrader", "MT4", "MT5"], usClients: false },
];

const getCommissionText = (broker: { id: string; spreadsFrom: string; platforms: string[] }) => {
  if (broker.id === "interactive-brokers") return "Commission from $0.35 per side on standard FX lots.";
  if (broker.id === "oanda") return "Spread-only pricing with no separate FX commission.";
  if (broker.spreadsFrom === "0.0 pips") return "Raw spread + small volume-based commission on major markets.";
  return "Variable spread pricing with no separate commission on retail FX accounts.";
};

const getInstrumentCategories = (broker: { platforms: string[] }) => {
  const categories = new Set<string>(["Forex", "Indices", "Commodities", "Metals"]);
  const hasCrypto = broker.platforms.some((plat) => /TradingView|MT5|Web Trader|App|cTrader|HF App|DupliTrade|Crypto/i.test(plat));
  const hasStocks = broker.platforms.some((plat) => /Trader Workstation|Client Portal|SaxoTrader|Iress|Next Generation|Web Trader|MetaTrader 5/i.test(plat));

  if (hasCrypto) categories.add("Crypto");
  if (hasStocks) categories.add("Stocks");

  return Array.from(categories);
};

export const BROKER_HUB_BROKERS: Broker[] = BROKER_HUB_SEED.map((broker) => ({
  id: broker.id,
  name: broker.name,
  logo: broker.logo,
  rating: broker.rating,
  reviewsCount: Math.floor(broker.established * 0.45) + 115,
  minDeposit: broker.minDeposit,
  maxLeverage: broker.maxLeverage,
  spreadsFrom: broker.spreadsFrom,
  regulatedBy: broker.regulatedBy,
  platforms: broker.platforms,
  commission: getCommissionText(broker),
  instruments: getInstrumentCategories(broker),
  pros: [
    `Regulated across ${broker.regulatedBy.length} global jurisdictions.`,
    `${broker.spreadsFrom === "0.0 pips" ? "Raw ECN spreads" : "Competitive pricing"} for active currency traders.`,
    `Supports ${broker.platforms.slice(0, 3).join(", ")} and secure funding channels.`,
    `Operating since ${broker.established} with strong compliance and execution oversight.`,
  ],
  cons: [
    "KYC and compliance verification can take 1-2 business days.",
    broker.minDeposit > 250 ? "Higher initial funding threshold for advanced accounts." : "Some regional deposits require additional verification.",
  ],
  summary: `${broker.name} is a regulation-first broker established in ${broker.established}, offering ${broker.platforms.join(", ")} with ${broker.spreadsFrom} and multi-jurisdiction oversight.`,
  depositMethods: ["Visa/Mastercard", "Bank Wire Transfer", "Skrill", "Neteller", "Crypto"],
  usClients: broker.usClients,
  established: broker.established,
  overallScore: { trust: 0, fees: 0, platforms: 0, support: 0 },
  reviewText: `PriceLot objective audit of ${broker.name} highlights consistent trade routing and compliance monitoring across ${broker.regulatedBy.join(", ")}. Execution is supported by ${broker.platforms.join(", ")} for traders seeking transparency.`,
}));

export function getComparisonSlug(a: Broker, b: Broker) {
  return `${a.id}-vs-${b.id}`;
}

export function getComparisonBrokers(pairSlug: string): [Broker, Broker] | null {
  const [first, second] = pairSlug.split("-vs-");
  if (!first || !second) return null;
  const brokerA = getBrokerById(first);
  const brokerB = getBrokerById(second);
  return brokerA && brokerB ? [brokerA, brokerB] : null;
}

export function getComparisonPairs() {
  const pairs: { slug: string; brokerA: Broker; brokerB: Broker }[] = [];

  for (let i = 0; i < BROKER_HUB_BROKERS.length; i += 1) {
    for (let j = i + 1; j < BROKER_HUB_BROKERS.length; j += 1) {
      const brokerA = BROKER_HUB_BROKERS[i];
      const brokerB = BROKER_HUB_BROKERS[j];
      pairs.push({
        slug: getComparisonSlug(brokerA, brokerB),
        brokerA,
        brokerB,
      });
    }
  }

  return pairs.sort((a, b) => (b.brokerA.rating + b.brokerB.rating) - (a.brokerA.rating + a.brokerB.rating));
}

export function getBrokerById(id: string) {
  return BROKER_HUB_BROKERS.find((broker) => broker.id === id);
}

export function getRelatedBrokers(id: string, limit = 4) {
  const baseBroker = getBrokerById(id);
  if (!baseBroker) return [];

  return BROKER_HUB_BROKERS
    .filter((broker) => broker.id !== id)
    .map((broker) => ({
      broker,
      score:
        (broker.regulatedBy.some((reg) => baseBroker.regulatedBy.includes(reg)) ? 2 : 0) +
        (broker.platforms.some((plat) => baseBroker.platforms.includes(plat)) ? 1 : 0) +
        (broker.minDeposit === baseBroker.minDeposit ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.broker);
}

export function getBrokerHub() {
  const platforms = Array.from(new Set(BROKER_HUB_BROKERS.flatMap((broker) => broker.platforms)));
  const regulators = Array.from(new Set(BROKER_HUB_BROKERS.flatMap((broker) => broker.regulatedBy)));

  return {
    brokers: BROKER_HUB_BROKERS,
    stats: {
      brokerCount: BROKER_HUB_BROKERS.length,
      platformCount: platforms.length,
      regulatorCount: regulators.length,
    },
  };
}
