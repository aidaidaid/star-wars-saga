export function insertData(array) {
        return array?.map((item, index)=>{
                if (index == array.length-1) {
                    return <span key={index} className='character'>{item}</span>
                } else {
                    return <span key={index} className='character'>{item+', '}</span>
                }
            }
        )
    }