import React from 'react'
import "./ui.css"
export const Uicopy = () => {
  return (
    <>
     <div class="nav">
      <input type="checkbox" id="nav-checkbox-1" class="nav-checkbox" />
      <label for="nav-checkbox-1" class="nav-label">
        <img src="https://via.placeholder.com/30x30" alt="Checkbox 1" class="nav-image" /> Checkbox 1
      </label>
      
      <input type="checkbox" id="nav-checkbox-2" class="nav-checkbox" />
      <label for="nav-checkbox-2" class="nav-label">
        <img src="https://via.placeholder.com/30x30" alt="Checkbox 2" class="nav-image" /> Checkbox 2
      </label>
      
      <input type="checkbox" id="nav-checkbox-3" class="nav-checkbox" />
      <label for="nav-checkbox-3" class="nav-label">
        <img src="https://via.placeholder.com/30x30" alt="Checkbox 3" class="nav-image" /> Checkbox 3
      </label>
      
      <input type="checkbox" id="nav-checkbox-4" class="nav-checkbox"/>
      <label for="nav-checkbox-4" class="nav-label">
        <img src="https://via.placeholder.com/30x30" alt="Checkbox 4" class="nav-image" /> Checkbox 4
      </label>
      
      <input type="checkbox" id="nav-checkbox-5" class="nav-checkbox" />
      <label for="nav-checkbox-5" class="nav-label">
        <img src="https://via.placeholder.com/30x30" alt="Checkbox 5" class="nav-image" /> Checkbox 5
      </label>
    </div>
    
    {/* <!-- Page content --> */}
    <div class="content">
      <h1>Welcome to my page</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum velit nec nunc varius consequat. Duis in mauris elit. Pellentesque vel augue aliquam, placerat libero at, rutrum lacus. Donec ultrices eget arcu in vestibulum. Suspendisse potenti. Fusce pharetra leo at nulla lacinia, vel finibus velit vestibulum. Donec in nunc dui.</p>
    </div>
    </>
  )
}
