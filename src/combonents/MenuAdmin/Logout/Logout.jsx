import React from 'react'

function Logout() {
  return (
    <div>
      <div class="navbar-collapse collapse">
  <ul class="nav navbar-nav">
    <li class="dropdown">
      <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">Dropdown<span class="caret"></span></a>
      <ul class="dropdown-menu">

        <li><a href="#">Foo</a></li>


        <li><form action="/logout" method="post"><button type="submit" class="btn btn-link navbar-btn navbar-link">Log off</button></form></li>

      </ul>
    </li>
  </ul>
</div>
    </div>
  )
}

export default Logout
