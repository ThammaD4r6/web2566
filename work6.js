const RB = ReactBootstrap;
const { Alert, Card, Button, Table } = ReactBootstrap;

class App extends React.Component {
    title = (
        <Alert variant="info">
            <b>Work 6 :</b> Firebase
        </Alert>
    );
    footer = (
        <div>
            By xxxxxxxxxx-x xxxxxxxxxxxxx xxxxxxxxxxxxxx <br />
            College of Computing, Khon Kaen University
        </div>
    );
    state = {
        scene: 0,
        students: [],
        stdid: "",
        stdtitle: "",
        stdfname: "",
        stdlname: "",
        stdemail: "",
        stdphone: "",
    }

    render() {
        return (
            <Card>
                <Card.Header>{this.title}</Card.Header>
                <Card.Body>
                    <Button onClick={() => this.readData()}>Read Data</Button>
                    <Button onClick={() => this.autoRead()}>Auto Read</Button>
                    <div>
                        <StudentTable data={this.state.students} />
                    </div>
                </Card.Body>
                <Card.Footer>
                    <b>เพิ่ม/แก้ไขข้อมูล นักศึกษา :</b><br />
                    <TextInput label="ID" app={this} value="stdid" />
                    <TextInput label="คำนำหน้า" app={this} value="stdtitle" />
                    <TextInput label="ชื่อ" app={this} value="stdfname" />
                    <TextInput label="สกุล" app={this} value="stdlname" />
                    <TextInput label="Email" app={this} value="stdemail" />
                    <TextInput label="Phone" app={this} value="stdphone" />
                    <Button onClick={() => this.insertData()}>Save</Button>
                </Card.Footer>
                <Card.Footer>{this.footer}</Card.Footer>
            </Card>
        );
    }
    edit(std){      
        this.setState({
         stdid    : std.id,
         stdtitle : std.title,
         stdfname : std.fname,
         stdlname : std.lname,
         stdemail : std.email,
         stdphone : std.phone,
        })
     }
 

    insertData() {
        if (!this.state.stdid || !this.state.stdtitle || !this.state.stdfname || !this.state.stdlname || !this.state.stdemail || !this.state.stdphone) {
            alert("Please fill in all fields.");
            return;
        }

        db.collection("students").doc(this.state.stdid).set({
            title: this.state.stdtitle,
            fname: this.state.stdfname,
            lname: this.state.stdlname,
            phone: this.state.stdphone,
            email: this.state.stdemail,
        });
    }

    readData() {
        db.collection("students").get().then((querySnapshot) => {
            var stdlist = [];
            querySnapshot.forEach((doc) => {
                stdlist.push({ id: doc.id, ...doc.data() });
            });
            this.setState({ students: stdlist });
        });
    }
    delete(std){
        if(confirm("ต้องการลบข้อมูล")){
           db.collection("students").doc(std.id).delete();
        }
    }


    autoRead() {
        db.collection("students").onSnapshot((querySnapshot) => {
            var stdlist = [];
            querySnapshot.forEach((doc) => {
                stdlist.push({ id: doc.id, ...doc.data() });
            });
            this.setState({ students: stdlist });
        });
    }
}


function StudentTable({data, app}){
    return <table className='table'>
    <tr>
        <td>รหัส</td>
        <td>คำนำหน้า</td>
        <td>ชื่อ</td>
        <td>สกุล</td>
        <td>email</td>
        </tr>
        {
          data.map((s)=><tr>
          <td>{s.id}</td>
          <td>{s.title}</td>
          <td>{s.fname}</td>
          <td>{s.lname}</td>
          <td>{s.email}</td>
          <td><EditButton std={s} app={app}/></td>
          <td><DeleteButton std={s} app={app}/></td>        
          </tr> )
        }
    </table>
  }




  function TextInput({label,app,value,style}){
    return <label className="form-label">
    {label}:    
     <input className="form-control" style={style}
     value={app.state[value]} onChange={(ev)=>{
         var s={};
         s[value]=ev.target.value;
         app.setState(s)}
     }></input>
   </label>;  
  }
  function DeleteButton({std,app}){    
    return <button onClick={()=>app.delete(std)}>ลบ</button>
  }


function EditButton({std,app}){
    return <button onClick={()=>app.edit(std)}>แก้ไข</button>
   }
 

const container = document.getElementById("myapp");
const root = ReactDOM.createRoot(container);
root.render(<App />);

const firebaseConfig = {
    apiKey: "AIzaSyBHKEj3SV0SZafdp2gX3qcAMQce1GiB3ZQ",
    authDomain: "web2566-183ac.firebaseapp.com",
    projectId: "web2566-183ac",
    storageBucket: "web2566-183ac.appspot.com",
    messagingSenderId: "213603252836",
    appId: "1:213603252836:web:dcdde87c3fd9bf3d8efd71",
    measurementId: "G-HH09ZWJC9D"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
