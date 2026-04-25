```jsx
import { Route, Routes } from "react-router-dom";

import BlogPage from "./pages/BlogPage";

import HomePage from "./pages/HomePage";

import PostDetails from "./pages/PostDetails";

import Settings from "./pages/Settings";

  

function App() {

return (

<>

<Routes>

<Route path="/" element={<HomePage />} />

<Route path="/blog" element={<BlogPage />} />
esta es aqui bro
<Route path="/blog/:id" element={<PostDetails />} />

y PostDetails es la pagina dinamica con el id 

<Route path="/settings" element={<Settings />} />

</Routes>

</>

);

}

  

export default App;
```



```jsx
import React from "react";

import { Link } from "react-router-dom";

  

const PostCard = (props) => {

const { post } = props;

return (

<article>
aqui se crea la ruta  dinamica parametrica del blog
<Link to={`/blog/${post.id}`}>

<h3>{post.title}</h3>

</Link>

  

<p>{post.body}</p>

</article>

);

};

  

export default PostCard;
```

```jsx
import React from "react";

import HeaderComponent from "../components/HeaderComponent";

import { useParams } from "react-router-dom";

import { useEffect } from "react";

  

const PostDetails = () => {

const { id } = useParams();

const [post, setPost] = React.useState({});

  

const fetchPost = async (id) => {

const response = await fetch(

`https://jsonplaceholder.typicode.com/posts/${id}`

);

const data = await response.json();

setPost(data);

};

  

useEffect(() => {

fetchPost(id);

});

  

const HTMLpost = (

<section>

<h1>{post.title}</h1>

<p>{post.body}</p>

</section>

);

return (

<>

<HeaderComponent />

<div>PostDetails{id}</div>

{post ? HTMLpost : <h1>Loading...</h1>}

</>

);

};

  

export default PostDetails;
```




```
import React from "react";

import HeaderComponent from "../components/HeaderComponent";

import PostCard from "../components/PostCard";

import { useState } from "react";

  

const BlogPage = () => {

const [posts, setPosts] = useState([]);

const [loading, setLoading] = useState(true);

  

const getPosts = async () => {

try {

const response = await fetch(

"https://jsonplaceholder.typicode.com/posts"

);

const data = await response.json();

setPosts(data);

} catch (error) {

console.log("Error fetching posts", error);

} finally {

setLoading(false);

}

};

  

React.useEffect(() => {

getPosts();

}, []);

  

const HTMLblog = posts.map((post) => {

return (

<li key={post.id}>

<PostCard post={post} />

</li>

);

});

  

return (

<>

<HeaderComponent />

<h1>Blog Page</h1>

{loading ? (

<h2 style={{ color: "red" }}>Loading...</h2>

) : (

<ul>{HTMLblog}</ul>

)}

</>

);

};

  

export default BlogPage;
```