"use client";

import { cn } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useCallback, useMemo } from "react";
import { InView } from "react-intersection-observer";
import Button from "../common/Button";
import { Timeline, TimelineItem } from "../common/Timeline";
import styles from "./styles/Animation.module.scss";
import { useIsTablet } from "@/hooks/useMediaQuery";
import useWallet from "@/hooks/useWallet";

const StepInsurance = () => {
	const isTablet = useIsTablet();

	const handleWalletClick = useCallback(
		async (event: MouseEvent<HTMLButtonElement>, walletName: string) => {
			// select(walletName);
		},
		[]
	);

	const titles = "3 simple steps to activate contract";
	return (
		<div className="">
			<InView rootMargin="0px" threshold={0.5}>
				{({ inView, ref }) => (
					<div
						className={cn(
							inView ? styles.titleAnimation : "",
							"lg:mb-20 mb:6"
						)}
						ref={ref}
					>
						{titles.split(" ").map((item, index) => (
							<span
								key={`${item}${index}`}
								className="text-typo-accent lg:text-5xl text-3xl lg:h-12 font-determination uppercase lg:tracking-[2.88px] tracking-[1.68px]"
							>
								{item}
							</span>
						))}
					</div>
				)}
			</InView>

			<Timeline >
				<>
					<TimelineItem
						side="left"
						date={
							<div className="lg:w-max lg:min-w-[428px] w-[288px] lg:h-max py-4 px-4 flex flex-col gap-y-2">
								<p className="text-xl text-typo-primary">Connect Wallet</p>
								{/* <Wallets closeModal={() => {}} /> */}
								<div className={cn("flex flex-col gap-y-5 p-0 w-full")}>

									<Button
										// key={wallet.name}
										size="md"
										point={false}
										variant="outline"
										customHeight={true}
										className={cn(
											"p-3 justify-between text-typo-primary hover:text-typo-accent bg-support-black border border-divider-secondary",
											// !disabled ? "hover:bg-background-secondary hover:text-typo-accent hover:border-divider-primary" : "",
											// className
										)}
										disabled={true}
										// onClick={connectWallet}
									>
										<div className="flex items-center gap-2">
											<Image
												width={32}
												height={32}
												src="/assets/images/leap.png"
												alt="leap"
												className="size-6"
											/>
											<div className="text-body-16">Leap</div>
										</div>

										{/* {!isInstallLeap() && <p className="text-body-14">Install</p>} */}
									</Button>

								</div >
							</div>
						}
						title="Connect Wallet"
						content="Easily connect to blockchain wallets such as Metamask, Coin98,
          Coinbase Wallet, WalletConnect"
						isButton={false}
					/>
					<TimelineItem
						side="right"
						date={
							<Image
								src="/assets/images/home/step_2.png"
								width={288}
								height={276}
								alt="step 2"
								className="lg:w-[488px] lg:h-[485px] w-[288px] h-[276px] rounded"
							/>
						}
						title="Adjust contract"
						content="Use our suggested parameters or freely customize the contract
          parameters before opening contract."
						isButton={false}
					/>
					<TimelineItem
						side="left"
						date={
							<Image
								src="/assets/images/home/step_3.png"
								alt="step 3"
								width={288}
								height={220}
								className="lg:w-[488px] lg:h-[394px] w-[288px] h-[220px] rounded"
							/>
						}
						title="Sign and confirm"
						content="Confirm to open contract, minimize the risk today!"
						isButton={false}
					/>
					{isTablet ? (
						<TimelineItem
							side="right"

							date={
								<Link href="/buy-cover" className="">
									<Button size="lg" variant="primary" className="w-[280px]">
										<p className="w-full text-center">Buy cover</p>
									</Button>
								</Link>
							}
							isButton={true}
							title=""
							content=""
						/>
					) : null}
				</>
			</Timeline>
			<Link
				href="/buy-cover"
				className="w-full lg:flex items-center justify-center hidden"
			>
				<Button size="lg" variant="primary">
					<p className="w-full text-center">Buy cover</p>
				</Button>
			</Link>
		</div>
	);
};

export default StepInsurance;
