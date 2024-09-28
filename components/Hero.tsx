"use client";
import React, { useEffect, useRef, useState, MouseEvent } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
// import Video from "./Video";

export const Hero: React.FC = () => {
  return (
    <div className="relative h-screen w-full flex justify-center items-center overflow-hidden">
      <BackgroundCellCore />
      <div className="relative z-40 px-4 md:px-8 lg:px-16 text-center pointer-events-none select-none mt-20">
        <div className="mx-24">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-medium text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-500 mt-16 md:mt-20 lg:mt-28 pointer-events-none">
            Built to Hire Better
          </h1>
          <p className="text-neutral-700 text-sm sm:text-base md:text-lg lg:text-xl my-4 lg:my-6">
            RS Consulting has over 13 years of experience and expertise in
            filling challenging and niche roles. With a proven research
            methodology, we specialize in sourcing high-caliber candidates for
            even the toughest positions.
          </p>
          <div className="my-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://github.com/anujsb"
              className="z-50 pointer-events-auto"
            >
              <Button className="px-4 py-2 text-sm sm:text-base">
                Contact Us Today!
              </Button>
            </Link>
            {/* <p className="text-neutral-600 text-xs sm:text-sm md:text-base">
            5,000 people like you <br className="hidden sm:block" /> have
            purchased this product!
          </p> */}
          </div>
        </div>
        <div id="video" className="mt-16 md:mt-32 lg:mt-40 w-full">
          {/* <Video /> */}
        </div>
      </div>
    </div>
  );
};

const BackgroundCellCore: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (event: MouseEvent) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  };

  const size = 300;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="h-screen absolute inset-0"
    >
      <div className="absolute h-screen inset-y-0 overflow-hidden">
        <div className="absolute h-full w-full pointer-events-none -bottom-2 z-40 bg-white [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
        <div
          className="absolute inset-0 z-20 bg-transparent"
          style={{
            maskImage: `radial-gradient(
              ${size / 4}px circle at center,
              white, transparent
            )`,
            WebkitMaskImage: `radial-gradient(
              ${size / 4}px circle at center,
              white, transparent
            )`,
            WebkitMaskPosition: `${mousePosition.x - size / 2}px ${
              mousePosition.y - 1.5 * size
            }px`,
            WebkitMaskSize: `${size}px`,
            maskSize: `${size}px`,
            pointerEvents: "none",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <Pattern cellClassName="border-[#4A4A4A] relative z-[100]" />
        </div>
        <Pattern className="opacity-[0.5]" cellClassName="border-[#CCCCCC]" />
      </div>
    </div>
  );
};

const Pattern: React.FC<{ className?: string; cellClassName?: string }> = ({
  className,
  cellClassName,
}) => {
  const x = new Array(47).fill(0);
  const y = new Array(30).fill(0);
  const matrix = x.map((_, i) => y.map((_, j) => [i, j]));
  const [clickedCell, setClickedCell] = useState<[number, number] | null>(null);

  return (
    <div className={cn("flex flex-row relative z-30", className)}>
      {matrix.map((row, rowIdx) => (
        <div
          key={`matrix-row-${rowIdx}`}
          className="flex flex-col relative z-20 border-b"
        >
          {row.map((_, colIdx) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const controls = useAnimation();

            // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => {
              if (clickedCell) {
                const distance = Math.sqrt(
                  Math.pow(clickedCell[0] - rowIdx, 2) +
                    Math.pow(clickedCell[1] - colIdx, 2)
                );
                controls.start({
                  opacity: [0, 1 - distance * 0.1, 0],
                  transition: { duration: distance * 0.2 },
                });
              }
            }, [clickedCell, rowIdx, colIdx, controls]);

            return (
              <div
                key={`matrix-col-${colIdx}`}
                className={cn(
                  "bg-transparent border-l border-b border-neutral-600",
                  cellClassName
                )}
                onClick={() => setClickedCell([rowIdx, colIdx])}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: [0, 1, 0.5] }}
                  transition={{ duration: 0.5, ease: "backOut" }}
                  animate={controls}
                  className="bg-[#BEBEBE] h-9 w-9"
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
