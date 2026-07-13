import { FiCpu, FiCreditCard, FiActivity, FiShield, FiCloud, FiLock, FiGlobe, FiZap } from "react-icons/fi";

const map = {
  cpu: FiCpu,
  wallet: FiCreditCard,
  activity: FiActivity,
  shield: FiShield,
  cloud: FiCloud,
  lock: FiLock,
  globe: FiGlobe,
  zap: FiZap,
};

export default function Icon({ name, className = "" }) {
  const Cmp = map[name] || FiCpu;
  return <Cmp className={className} />;
}
