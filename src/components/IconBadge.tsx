import Image from "next/image";

export type IconBadgeSpec = {
  src: string;
  alt: string;
  size: number;
  rotate: number;
  style: React.CSSProperties;
  className?: string;
};

export function IconBadge({ spec }: { spec: IconBadgeSpec }) {
  return (
    <div
      className={`icon-badge pointer-events-none absolute drop-shadow-[0_16px_28px_rgba(32,43,40,0.28)] ${spec.className ?? ""}`}
      style={{
        width: spec.size,
        height: spec.size,
        rotate: `${spec.rotate}deg`,
        ...spec.style,
      }}
    >
      <Image src={spec.src} alt={spec.alt} fill sizes={`${spec.size}px`} className="object-contain" />
    </div>
  );
}
