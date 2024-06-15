import ImageCard from "../ImageCard/ImageCard"

const ImageGallery = ({images}) => {
  return (
    <ul>
	{images.map(({id, urls, description}) => <ImageCard key={id} urls={urls} description={description}/>)}
	<li>
		<div>
            <img src="" alt="" />
		</div>
	</li>
</ul>
  )
}

export default ImageGallery