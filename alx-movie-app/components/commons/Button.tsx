import { ButtonProps } from "@/interfaces"


const Button: React.FC<ButtonProps> = ({ title, action }) => {
    return (
        <>
            <button onClick={action} className="px-8 py-2 border-2 border-[] rounded-full hover:bg-[#E2D609] hover:text-vblack transition-colors durtion">
                {title}
            </button>
        </>
    )
}

export default Button