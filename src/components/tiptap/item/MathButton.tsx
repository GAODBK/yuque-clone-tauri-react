// src/components/tiptap/item/MathButton.tsx

// @ts-ignore
const MathButton = ({editor}) => {
    const addMath = () => {
        const formula = prompt('请输入 LaTeX 公式:', 'c = \\pm\\sqrt{a^2 + b^2}');
        if (formula) {
            editor.chain().focus().setMath(formula).run();
        }
    };

    return (
        <button
            onClick={addMath} disabled={!editor}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 128 128"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path
                    d="m 24.827171,12.268815 0,3.124898 5.505773,0 0,37.052362 -5.505773,0 0,3.050496 34.671488,0 0,-10.788339 -3.571312,0 0,7.291429 -19.716619,0 0,-36.605948 5.505773,0 0,-3.124898 -16.88933,0 z m 56.917786,3.273702 -15.475686,40.177261 -3.794519,0 0,3.124898 12.201983,0 0,-3.124898 -4.761749,0 3.645714,-9.449097 18.15417,0 3.645714,9.449097 -4.836152,0 0,3.124898 15.773298,0 0,-3.124898 -4.24094,0 -15.475681,-40.177261 -4.836152,0 z m 0.96723,6.99382 7.886648,20.609446 -15.847698,0 7.96105,-20.609446 z m -70.235804,36.605948 0,10.19312 3.571312,0 0,-6.69621 12.7228,0 0,36.754753 -5.505773,0 0,3.050492 16.88933,0 0,-3.050492 -5.505773,0 0,-36.754753 12.722799,0 0,6.69621 3.49691,0 0,-10.19312 -38.391605,0 z m 61.605133,3.050496 0,3.050496 4.612945,0 12.648397,18.972595 -12.42519,18.154168 -4.984956,0 0,3.0505 14.285248,0 0,-3.0505 -5.580175,0 10.565131,-15.475684 10.341924,15.475684 -5.13376,0 0,3.0505 17.11254,0 0,-3.0505 -4.61295,0 L 97.220642,81.9094 108.6786,65.243277 l 4.91056,0 0,-3.050496 -14.21085,0 0,3.050496 5.58018,0 -9.523504,13.987639 -9.300291,-13.987639 5.133761,0 0,-3.050496 -17.18694,0 z m -31.993004,11.606764 0,3.050496 5.505773,0 0,37.126769 -5.505773,0 0,3.05049 35.341109,0 0,-9.5979 -3.571312,0 0,6.02659 -20.311837,0 0,-18.079768 14.136444,0 0,5.431368 3.571312,0 0,-14.43405 -3.571312,0 0,5.43137 -14.136444,0 0,-14.508455 19.865423,0 0,6.100991 3.571312,0 0,-9.597901 -34.894695,0 z"/>
            </svg>
        </button>
    );
};

export default MathButton;
