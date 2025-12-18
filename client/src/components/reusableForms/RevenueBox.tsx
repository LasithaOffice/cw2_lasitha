import Typography from '../ui/single/Typography'

const RevenueBox = ({ data, title, color }: { data: string, title: string, color: string }) => {
  return (
    <div className={`flex flex-1 flex-col justify-center items-center p-5 rounded-2xl m-2 ${color}`}>
      <Typography type='h2'>{title}</Typography>
      <p className='text-4xl mt-2'>{data}</p>
    </div>
  )
}

export default RevenueBox