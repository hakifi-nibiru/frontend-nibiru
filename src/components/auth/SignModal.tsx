import Modal from "@/components/common/Modal";
import WarningIcon from "../common/Icons/WarningIcon";
import colors from "@/colors";

type SignModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
}

const SignModal = ({
    isOpen,
    onRequestClose
}: SignModalProps) => {
    return (
        <Modal
            modal={true}
            isOpen={isOpen}
            isMobileFullHeight
            onRequestClose={onRequestClose}
            showCloseButton={false}
            useDrawer={false}
        >
            <div className="flex flex-col items-center gap-5 py-8">

                <WarningIcon width={124} height={124} color={colors.warning.DEFAULT} />

                <p className="text-body-16 text-typo-primary text-center">
                    Please proceed with "Sign" and "Confirm" to complete the authentication step on your wallet
                </p>
            </div>
        </Modal>
    )
}

export default SignModal;