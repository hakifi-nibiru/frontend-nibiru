import colors from '@/colors';
import WarningIcon from '@/components/common/Icons/WarningIcon';
import Spinner from '@/components/common/Spinner';
import useBuyCoverStore from '@/stores/buy-cover.store';

type StepConfirmProps = {
};

const StepSign = ({ }: StepConfirmProps) => {
    const isConfirming = useBuyCoverStore((state) => state.isConfirming);

    return (
        <div className="flex flex-col items-center gap-5">
            {isConfirming ?
                (<div className='w-[124px] h-[124px] flex items-center justify-center'><Spinner size="small" /></div>)
                : (
                    <WarningIcon width={124} height={124} color={colors.warning.DEFAULT} />
                )}
            <p className="text-body-16 text-typo-primary text-center">
                Please proceed with "Sign" and "Confirm" to complete the authentication step on your wallet
            </p>
            <section className="border border-divider-secondary p-4 flex flex-col gap-3 rounded">
                <p className="text-body-14 text-typo-secondary">
                    (*) Actual Open Price does not exceed 0.3% compared to Market Price at the time of choosing "Confirm"
                </p>
                <p className="text-body-14 text-typo-secondary">
                    (**) While the insurance contract is being validated, please do not Refresh
                </p>
            </section>
        </div>
    );
};

export default StepSign;