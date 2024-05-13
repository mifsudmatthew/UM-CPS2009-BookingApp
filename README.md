<h1 align="center"> Tennis Court Booking System</h1>

<p align="center"><a target="_blank" rel="noopener noreferrer"><img width="180" src="https://i.ibb.co/z6nLrz5/logo.png" alt="logo"></a></p>

## Contributors
<div width="100%">
    <table style="margin: 0 auto;" align="center">
        <tr>
            <td align="center"><a href="https://github.com/mifsudmatthew"><img alt="Matthew Mifsud" style="width: 100px; border-radius: 50%;" src="https://avatars.githubusercontent.com/u/97695752?v=4"/></a></td>
            <td align="center"><a href="https://github.com/KeithFarrugia"><img alt="Keith Farrugia" style="width: 100px; border-radius: 50%;" src="https://avatars.githubusercontent.com/u/148719589?v=4"/></a></td>
            <td align="center"><a href="https://github.com/FirePhoenixBro"><img alt="Luca Vella" style="width: 100px; border-radius: 50%;" src="https://avatars.githubusercontent.com/u/104022853?v=4"/></a></td>
            <td align="center"><a href="https://github.com/lensil"><img alt="Lenise Silvio" style="width: 100px; border-radius: 50%;" src="https://avatars.githubusercontent.com/u/147991201?v=4"/></a></td>
        </tr>
        <tr>
            <td align="center"> Matthew Mifsud </td>
            <td align="center"> Keith Farrugia </td>
            <td align="center"> Luca Vella </td>
            <td align="center"> Lenise Silvio </td>
        </tr>
    </table>
</div>


## Terminal Commands (must be in root when executed)

<table align="center">
    <tr>
    <td>Build Front End</td>
    <td>npm run build</td>
    </tr> 
    <tr>
    <td>Start Server  (127.0.0.1:3000)</td>
    <td>
    npm run start
    </td>
    </tr>
    <tr>
    <td>Build Front End and Start server</td>
    <td>
    npm run start_build
    </td>
    </tr>
    <tr>
    <td>Run Tests and Obtain Coverage</td>
    <td>
    npm run test
    </td>
    </tr>
</table>

## Project Structure

<table style="margin: 0 auto;" align="center">
  <tr>
    <td>
      <b>Folder Structure:</b>
      <br>
      <br><b>root</b>
      <ul>
        <li><b>client</b>
          <ul>
            <li><b>public</b></li>
            <li><b>src</b>
              <ul>
                <li><b>assets</b></li>
                <li><b>components</b>
                  <ul>
                    <li><b>admin</b></li>
                    <li><b>form</b></li>
                    <li><b>home</b></li>
                    <li><b>profile</b></li>
                    <li><b>shared</b></li>
                  </ul>
                </li>
                <li><b>context</b></li>
                <li><b>pages</b></li>
                <li><b>styles</b></li>
                <li><b>utils</b></li>
              </ul>
            </li>
          </ul>
        </li>
        <li><b>database</b>
          <ul>
            <li><b>schema_functions</b></li>
            <li><b>schemas</b></li>
          </ul>
        </li>
        <li><b>server</b>
          <ul>
            <li><b>post</b></li>
            <li><b>tests</b></li>
          </ul>
        </li>
      </ul>
    </td>
    <td>
      <b>Folder Details:</b>
              <br>
              <br>
              <br>
              <br>
      <b>client:</b> Contains all Front-end files and folders.
      <br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>public:</b> Contains static files sent to the client.
      <br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>src:</b> Contains all client-sided source code.
      <br>
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>assets:</b> Contains all images used.
      <br>
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>components:</b> Contains a collection of UI components created.
      <br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>admin, form, home, profile, shared:</b> Contain specific component types.
      <br>
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>context:</b> Contains all context providers required for state management.
      <br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>pages:</b> Contains all pages of the website.
      <br>
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>styles:</b> Contains all CSS files.
      <br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>utils:</b> Contains utility API and User functions.
      <br>
      <br>
      <b>database:</b> Contains all files and folders related to databases.
      <br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>schema_functions:</b> Contains all functions required for all schemas created.
      <br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>schemas:</b> Contains all schema definitions.
      <br>
      <br>
      <b>server:</b> Contains all files and folders related to the server.
      <br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>post:</b> Contains all POST request handlers.
      <br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>tests:</b> Contains unit tests for the server.
      <br>
      <br>
      <br>
      <br>
    </td>
  </tr>
</table>

## Commit Comment Format

<table align="center">
  <tr>
    <th><b>Purpose</b></th>
    <th> Format</th>
    <th> Description</th>
  </tr>

  <tr>
    <td><b>Fix</b></td>
    <td>&lt;location&gt; [Fix] : &lt;description&gt; &lt;bug report id&gt;</td>
    <td>Fixing a bug</td>
  </tr>
  
  <tr>
    <td><b>Testing</b></td>
    <td>&lt;location&gt; [Test] : &lt;description&gt;</td>
    <td>Testing related commit</td>
  </tr>

  <tr>
    <td><b>Feature</b></td>
    <td>&lt;location&gt; [Feat] : &lt;description&gt;</td>
    <td>Adding a new feature or code chunk</td>
  </tr>

  <tr>
    <td><b>Cleanup</b></td>
    <td>&lt;location&gt; [Cln] : &lt;description&gt;</td>
    <td>Clean up code or add/remove comments</td>
  </tr>

  <tr>
    <td><b>Change</b></td>
    <td>&lt;location&gt; [Chg] : &lt;description&gt;</td>
    <td>Changed an item</td>
  </tr>
</table>
