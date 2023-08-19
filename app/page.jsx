import Feed from "@components/Feed"

function Home() {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text'>
        Discover & Share
        <br className='max-md:hidden'/>
        <span className='orange_gradient'>AI-powerd app</span>  
      </h1>
      <p className='desc text-center'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, rem. Quibusdam, magni blanditiis. Unde vitae quibusdam odio minima at totam, rem vero repellendus deleniti asperiores maiores obcaecati tempore nulla pariatur magni voluptatem omnis ratione natus laudantium corrupti voluptas harum odit! Modi iusto quod incidunt nesciunt. Obcaecati eveniet magnam nesciunt debitis.</p>
      <Feed/>
    </section>
  )
}

export default Home