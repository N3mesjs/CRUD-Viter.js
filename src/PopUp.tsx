export default function PopUp() {
    return (
        <div className='absolute left-[50%] -translate-x-[50%] bg-green-600 text-white p-[2em] z-50 rounded-3xl popUp'>
            <h1 className="text-[20px]">Successo</h1>
            Operazione Avvenuta con successo
            <hr className="w-full border-1 mt-4 border-gray-700 hrAnim"></hr>
        </div>
    )
}