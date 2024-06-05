import { getFaucet } from "@/apis/general.api";
import Button from "@/components/common/Button";
import ShutdownIcon from "@/components/common/Icons/ShutdownIcon";
import UserIcon from "@/components/common/Icons/UserIcon";
import Modal from "@/components/common/Modal";
import { useNotification } from "@/components/common/Notification";
import Popup from "@/components/common/Popup";
import { useIsTablet } from "@/hooks/useMediaQuery";
import useToggle from "@/hooks/useToggle";
// import useWallet from "@/hooks/useWallet";
import useLogout from "@/hooks/useLogout";
import useWallet from "@/hooks/useWallet";
import useWalletStore from "@/stores/wallet.store";
import { cn } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ShortAddress from "./ShortAddress";

const Profile = () => {
	const router = useRouter();
	const isTablet = useIsTablet();
	const { address } = useWallet();
	const [walletInfo, setWallet] = useWalletStore((state) => [
		state.wallet,
		state.setWallet,
	]);

	const logout = useLogout();

	const { toggle, handleToggle } = useToggle();
	const handleOnChangeStatusModal = () => {
		handleToggle();
	};
	const notification = useNotification();
	const handleFaucetUsdt = async () => {
		try {
			if (walletInfo?.isFaucet === false) {
				const response = await getFaucet();
				if (response) {
					notification.success("Faucet USDT successfully");
					setWallet({ ...walletInfo, isFaucet: true });
				}
			}
		} catch (error: any) {
			notification.error(error.response.data.message);
		}
	};
	if (isTablet) {
		return (
			<>
				<Modal
					isOpen={toggle}
					onRequestClose={() => handleToggle()}
					useDrawer={true}
					contentClassName="min-w-[180px]">
					<div className="min-w-[150px]">
						<p className="text-typo-primary text-title-24">Account</p>
						{/* <Link href="/referral">
							<div className="flex w-full gap-2 py-1 items-center mt-5 text-typo-secondary">
								<UserIcon />
								<p className="text-sm">Profile</p>
							</div>
						</Link> */}
						<Button
							size="md"
							className="flex gap-2 py-2 items-center w-full text-typo-secondary hover:bg-background-secondary"
							onClick={(e) => {
								router.push("/referral");
								handleToggle();
							}}>
							<UserIcon />
							<p className="">Profile</p>
						</Button>

						{walletInfo?.isFaucet === false ? (
							<Button
								size="md"
								className={cn(
									"flex gap-2 py-2 items-center w-full text-typo-secondary hover:bg-background-secondary"
								)}
								onClick={handleFaucetUsdt}>
								<img
									src="/assets/images/cryptos/usdt.png"
									alt="USDT"
									className="w-4 h-4"
								/>{" "}
								<p>Faucet</p>{" "}
							</Button>
						) : null}
						<Link
							href="https://app.nibiru.fi/faucet"
							target="_blank"
							className={cn(
								"flex gap-2 py-2 items-center w-full text-typo-secondary hover:bg-background-secondary"
							)}>
							<Image
								src="/assets/images/nibi.png"
								width={16}
								height={16}
								alt="NIBI"

							/>
							<p className="flex items-center text-body-14">Faucet Nibi</p>{" "}
						</Link>

						<Button
							size="lg"
							className="flex gap-2 py-1 items-center w-full mt-4 text-typo-secondary"
							onClick={logout}>
							<ShutdownIcon />
							<p className="text-body-16">Disconnect</p>
						</Button>
					</div>
				</Modal>
				<Button
					size="lg"
					onClick={handleOnChangeStatusModal}
					onDoubleClick={() => window.open("/referral", "_parent")}>
					{address ? (
						<img
							className="size-6"
							src={"https://github.com/shadcn.png"}
							alt={address}
						/>
					) : null}
				</Button>
			</>
		);
	}

	return (
		<Popup
			isOpen={toggle}
			handleOnChangeStatus={() => handleToggle()}
			align="center"
			sideOffset={12}
			content={
				<>
					{/* <Link href="/referral">
						<div className="flex w-full gap-2 py-1 items-center mt-5 text-typo-secondary">
							<UserIcon />
							<p className="text-sm">Profile</p>
						</div>
					</Link> */}
					<Button
						size="md"
						className="flex gap-2 px-3 py-2 items-center w-full text-typo-secondary hover:bg-background-secondary"
						onClick={(e) => {
							// redirect("/referral")
							// e.preventDefault();
							// handleToggle();
							// window.open("/referral", "_parent");
							router.push("/referral");
						}}>
						<UserIcon />
						<p className="">Profile</p>
					</Button>
					{walletInfo?.isFaucet === false ? (
						<Button
							size="md"
							className={cn(
								"flex gap-2 px-3 py-2 items-center w-full text-typo-secondary hover:bg-background-secondary"
							)}
							onClick={handleFaucetUsdt}>
							<img
								src="/assets/images/cryptos/usdt.png"
								alt="USDT"
								className="w-4 h-4"
							/>{" "}
							<p className=" text-body-14">Faucet USDT</p>
						</Button>
					) : null}
					<Link
						href="https://app.nibiru.fi/faucet"
						target="_blank"
						className={cn(
							"flex gap-2 py-2 px-3 items-center w-full text-typo-secondary hover:bg-background-secondary"
						)}>
						<Image
							src="/assets/images/nibi.png"
							width={16}
							height={16}
							alt="NIBI"

						/>
						<p className="flex items-center text-body-14">Faucet Nibi</p>{" "}
					</Link>


					<Button
						size="lg"
						variant="ghost"
						className="flex text-typo-secondary gap-2 px-3 py-2 items-center w-full"
						onClick={logout}>
						<ShutdownIcon />
						<p className=" text-body-14">Disconnect</p>
					</Button>
				</>
			}
			classContent="left-4 bottom-10 min-w-[150px]">
			<ShortAddress
				toggle={toggle}
				onDoubleClick={() => router.push("/referral")}
				srcImage="/assets/images/avatar.png"
			/>
		</Popup>
	);
};

export default Profile;
