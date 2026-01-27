import BulbAnimation from "./BulbAnimation";
import TickAnimation from "./TickAnimation";
import ErrorAnimation from "./ErrorAnimation";

type MessageProps = {
    status: 'success' | 'error' | 'info',
    text: string,
    device?: 'mobile' | 'desktop'
}

const Message = ( {status, text}: MessageProps ) => {
  return (
    <div className={`py-2 text-sm rounded-lg w-full transform flex items-center justify-center gap-1 z-10 
    ${status === 'success' ? 'bg-green-100 text-green-700' : ''}
    ${status === 'error' ? 'bg-red-100 text-red-700' : ''} 
    ${status === 'info' ? 'bg-blue-100 text-blue-700' : ''}`}
    role="alert">
        {status === 'success' && <TickAnimation size={24} />}
        {status === 'error' && <ErrorAnimation size={24} />}
        {status === 'info' && <BulbAnimation size={24} />}
        <p className="text-sm font-medium text-center">{text}</p>
    </div>
  )
}

export default Message;
