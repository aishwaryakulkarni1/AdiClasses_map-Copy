import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
  DatePickerAndroid,
  TimePickerAndroid,
  Alert,
  AsyncStorage
} from "react-native";
import styled from "styled-components";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import { EditB2BLeadURL, EditB2CLeadURL } from "../assests/ApiUrl";
import { CheckBox } from "react-native-elements";
import RNImmediatePhoneCall from "react-native-immediate-phone-call";
import CallDetectorManager from 'react-native-call-detection';
// import RNFetchBlob from 'react-native-fetch-blob';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
//import FileSystem from 'react-native-filesystem';
import { audio_file } from "./base";
import firebase from "firebase";

var radio_props = [
  { label: "unverified", value: 0 },
  { label: "verified", value: 1 },
  { label: "dead", value: 2 },
  { label: "followup", value: 3 },
  { label: "appointment fixed", value: 4 },
  { label: "appointment done", value: 5 }
];
var scholar_props = [
  { label: "Day Scholar", value: 0 },
  { label: "Residential", value: 1 }
];
var foundation_props = [{ label: "Yes", value: 0 }, { label: "No", value: 1 }];
var infrastucture_props = [
  { label: "Good", value: 0 },
  { label: "Average", value: 1 },
  { label: "Bad", value: 2 }
];
var studentFinanceStatus_props = [
  { label: "Very Good", value: 0 },
  { label: "Middle Class", value: 1 },
  { label: "Poor", value: 2 }
];
var b2cClass_props = [
  { label: "7th", value: 0 },
  { label: "8th", value: 1 },
  { label: "9th", value: 2 },
  { label: "10th", value: 3 },
  { label: "11th", value: 4 },
  { label: "12th", value: 5 }
];

export default class ViewLead extends Component {
  state = {
    editable: false,
    leadType: 0,
    leadId: 0,
    status: "unverified",

    b2bschoolName: "",
    b2bCity: "",
    b2bDistrict: "",
    b2bState: "",
    b2bPrincipalName: "",
    b2bPrincipalMobile1: "",
    b2bPrincipalMobile2: "",
    b2bPrincipalEmail: "",
    b2bContactPersonName: "",
    b2bContactPersonMobile: "",
    b2bClass12Strength: "",
    b2bClass11Strength: "",
    b2b11thFee: "",
    b2bClass10Strength: "",
    b2b10thFee: "",
    b2bDecisionMakerName: "",
    b2bDecisionMakerMobile: "",
    nextMeetDate: "03/11/19",
    nextMeetTime: "05:00 pm",
    b2bResidential: "No",
    b2b8910Foundation: "Yes",
    b2bInfrastructure: "Good",
    b2bRemarks: "",

    b2cStudentName: "",
    b2cGuardianName: "",
    b2cStudentMobile1: "",
    b2cStudentMobile2: "",
    b2cStudentClass: "8th",
    b2cSchoolName: "",
    b2cSchoolEmail: "",
    b2cSchoolAddress: "",
    b2cCity: "",
    b2cState: "",
    b2cFinancialStatus: "Poor",
    b2cPrincipalName: "",
    b2cPrincipalMobile: "",
    b2c8910foundation: "Yes",
    b2cCoaching: "CET,IIT",
    b2cRemarks: "",

    CETchecked: false,
    NEETchecked: false,
    IITchecked: false,
    Advancedchecked: false,
    //Aishwarya
    startTime: '',
    audioURL: ''
  };


  //   async function deleteFile() {
  //   await FileSystem.delete('/storage/emulated/0/DCIM/CallRecordings/2019-06-03');
  //   console.log('file is deleted');
  // }

  // deleteFile = () => {
  //   FileSystem.delete("/storage/emulated/0/Android/data/com.adiclasses/thermoIssuesReport.txt");
  //   console.log('file is deleted');
  // }

  // checkIfFileExists = () => {
  //   const fileExists = FileSystem.fileExists("/storage/emulated/0/Android/data/com.adiclasses/CallRecordings");
  //   console.log(`directory exists: ${fileExists}`);
  // }
  // Changes to Add the call Listener 

  startListenerTapped() {
    this.callDetector = new CallDetectorManager((event) => {
      // For iOS event will be either "Connected",
      // "Disconnected","Dialing" and "Incoming"

      // For Android event will be either "Offhook",
      // "Disconnected", "Incoming" or "Missed"


      if (event === 'Disconnected') {
        console.log('Call status', event)

        //react-native-fs
        console.log('RNFS.DocumentDirectoryPath:', RNFS.DocumentDirectoryPath)
        const dir = RNFS.DocumentDirectoryPath + "/CallRecordings/" + new Date().getDate();

        RNFS.readDir(dir).then(files => {
          console.log('in folder', isDirectory())
        })
          .catch(err => {
            console.log(err.message, err.code);
          });

        //RN FileSystem
        // this.checkIfFileExists();
        // console.log('file exists. Before delete')
        // this.deleteFile();
        // console.log('after delete');
        //3 June
        // RNFetchBlob
        //   .config({
        //     // DCIMDir is in external storage
        //     path: dirs.DCIMDir + '/CallRecordings/2019-06-03/call_10-46-57_OUT_.amr'
        //   })
        //   .fetch('GET', 'http://example.com/CallRecordings/2019-06-03/call_10-46-57_OUT_.amr')
        //   .then((res) => RNFetchBlob.fs.scanFile([{ path: res.path(), mime: 'audio/amr' }]))
        //   .then(() => {
        //     // scan file success
        //     console.log('SUCESS AUDIO FILE', dirs.DCIMDir)
        //   })
        //   .catch((err) => {
        //     // scan file error
        //   })



        // const dir = RNFetchBlob.fs.dirs
        // var folderPath = dir.SDCardDir + "/CallRecordings/2019-06-04";
        // console.log('folder path', folderPath)
        // console.log('dirs:', RNFetchBlob.fs.dirs)
        // RNFetchBlob.fs.isDir(RNFetchBlob.fs.dirs.SDCardDir + '/CallRecordings/2019-06-04')
        //   .then((isDir) => {
        //     console.log('FOLDER EXISTS');
        //     RNFetchBlob.fs.unlink(RNFetchBlob.fs.dirs.SDCardDir + '/CallRecordings/2019-06-04')
        //       .then(() => { console.log('FOLDER DELETED') })
        //       .catch((err) => { console.log('FOLDER NOT DELETED') })
        //   })

        // RNFetchBlob.fs.unlink(folderPath)
        //   .then(() => { console.log('FOLDER DELETED') })
        //   .catch((err) => { console.log('FOLDER NOT DELETED') })




        // create a path you want to delete
        //var path = RNFS.DocumentDirectoryPath + '/test.txt';
        // var path = RNFS.DocumentDirectoryPath;

        // console.log("New Lib Path", path)
        // console.log("External files", RNFS.ExternalStorageDirectoryPath + '/CallRecordings');
        // var filePath = RNFS.ExternalStorageDirectoryPath + '/CallRecordings/2019-05-22'

        // RNFS.readDir(filePath)
        //   .then((result) => {
        //     console.log('GOT RESULT 1', result);
        //   })


        // console.log('GOT RESULT 2', RNFSy.readDir(filePath))


        // Writting something in the file first 

        //   var path = RNFS.ExternalStorageDirectoryPath + '/CallRecordings/2019-05-22/ujwal.txt';

        //   // write the file
        //   RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
        //  .then((success) => {
        //   console.log('FILE WRITTEN!');
        //   })
        //  .catch((err) => {
        //   console.log(err.message);
        //     });


        // File Deletion 
        // create a path you want to delete
        //var path = RNFS.ExternalStorageDirectoryPath + '/CallRecordings/2019-05-22/test.amr';
        //var path = RNFS.ExternalStorageDirectoryPath + '/CallRecordings/testtest.txt';
        // var path = RNFS.ExternalStorageDirectoryPath + '/callrecorder/05-2019/Unknown_Contact';

        //var path = RNFS.ExternalStorageDirectoryPath + '/CallRecordings/2019-05-22/test.amr';

        //uncomment when react-native-fs is installed
        //  var path = RNFS.ExternalStorageDirectoryPath + '/CallRecordings/2019-05-22';




        // return RNFS.exists(pa
        //   .then(() => {

        //     console.log('FILE EXIST');

        //     RNFS.unlink(path)
        //       .then(() => {
        //         console.log('Path for File', path);
        //         console.log('FILE DELETED');
        //       })
        //   })

        //   // `unlink` will throw an error, if the item to unlink does not exist
        //   .catch((err) => {
        //     console.log(err.message);
        //   });

        //uncomment when react-native-fs is installed
        // console.log('Path for File 1', path);
        // return RNFS.unlink(path)
        //   .then(() => {
        //     console.log('Path for File', path);
        //     console.log('FILE DELETED');
        //   })
        //   // `unlink` will throw an error, if the item to unlink does not exist
        //   .catch((err) => {
        //     console.log(err.message);
        //   });


        // .then((result) => {
        //   console.log('GOT RESULT', result);
        //   //   return Promise.all([RNFS.stat(result[0].path), result[0].path]);
        // })
        // .then((statResult) => {
        //   if (statResult[0].isFile()) {
        //     return RNFS.readFile(statResult[1], 'utf8');
        //   }
        //   return 'no file';
        // })
        // .then((contents) => {
        //   console.log(contents);
        // })
        // .catch((err) => {
        //   console.log(err.message, err.code);
        // });



        //file:///storage/emulated/0/CallRecordings/2019-05-21/call_12-40-34_OUT_.amr
        //RNFetchBlob.fs.dirs.CallRecordingsDir/2019-05-21/call_12-40-34_OUT_.amr
        // RNFetchBlob.fs.readFile("content:///storage/emulated/0/CallRecordings/2019-05-21/", 'base64')
        //   .then((data) => {
        //     // handle the data ..
        //     console.log('Audio path', data)
        //   })
        //CallRecordingsDir + '/2019-05-21/call_12-40-34_OUT_.amr
        // RNFetchBlob
        //   .config({ path:RNFetchBlob.fs.dirs.CallRecordingsDir/2019-05-21/call_12-40-34_OUT_.amr })
        //   // .fetch('GET', 'http://example.com/file/', {
        //   //   'Cache-Control': 'no-store'
        //   // })
        //   .then((res) => {
        //     res.path() // where the file is
        //     console.log('Audio path', res)
        //   })

        // var CallFolders = RNFetchBlob.fs.dirs.DownloadDir //+ '/CallRecordings/'
        // var CallFolders = RNFetchBlob.fs.dirs.DownloadDir //+ '/CallRecordings/'

        // var CallFolders = RNFetchBlob.fs.dirs



        // //filePath = `${dirs.CallRecordingsDir}`
        // console.log("dirs", CallFolders)

        // console.log("files in call", RNFetchBlob.fs.ls(CallFolders))
        // console.log("files in call3", CallFolders[2])
        // RNFetchBlob.fs.readFile(dirs, 'base64')
        //   .then((data) => {
        //     // handle the data ..
        //     console.log('Response Data', data)
        //   })


        // RNFetchBlob.fs.ls(dirs)
        //   // files will an array contains filenames
        //   .then((files) => {
        //     console.log("files in Download Dir", files)
        //   })


        // RNFetchBlob
        //   .config({ path: dirs })
        //   //   // .fetch('GET', 'http://example.com/file/', {
        //   //   //   'Cache-Control': 'no-store'
        //   //   // })
        //   .then((res) => {
        //     res.path() // where the file is
        //     console.log('Audio path', res)
        //   })



        //react-native-fs
        // + "_OUT_.amr";
        /* console.log('RNFS.DocumentDirectoryPath:', RNFS.DocumentDirectoryPath + "/CallRecordings/" +
          dateTimeFormat.getFullYear("YYYY") + "-" + dateTimeFormat.getMonth("MM") + "-" + dateTimeFormat.getDay("DD") + "/call_" +
          dateTimeFormat.getHours() + "-" + dateTimeFormat.getMinutes() + "-" + dateTimeFormat.getSeconds() + "_OUT_.amr") */


        // console.log('RNFS.DocumentDirectoryPath:', RNFS.DocumentDirectoryPath + "/CallRecordings/" + moment().format('YYYY-MM-DD') + "/call_" + this.state.startTime + "_OUT_.amr")
        // console.log('RNFS.DocumentDirectoryPath:', RNFS.DocumentDirectoryPath + "/CallRecordings/2019-06-10/call_20-48-53_OUT_.amr")


        // const audioFile = RNFS.DocumentDirectoryPath + "/CallRecordings/" + moment().format('YYYY-MM-DD') + "/call_" +
        //   moment().hours() + "-" + moment().minutes() + "-" + moment().seconds() + "_OUT_.amr"
        //  const audioFile = RNFS.DocumentDirectoryPath + "/CallRecordings/" + moment().format('YYYY-MM-DD') + "/call_" + this.state.startTime + "_OUT_.amr";
        //  const audioFile = "file://" + RNFS.DocumentDirectoryPath + "/CallRecordings/2019-06-10/call_20-48-53_OUT_.amr";

        /* commented on 21/6/19 */
        // const audioFile = "file:///data/user/0/com.adiclasses/files/CallRecordings/2019-06-21/call_15-30-59_OUT_.amr";
        // //const audioFile = "file:///data/user/0/com.locationtracking/cache/ReactNative-snapshot-image86289171497911915.jpg";

        // this.setState({ audioURL: audioFile })
        // console.log('after Assigning  the Path', this.state.audioURL)
        // // RNFS.exists(this.state.audioURL).then(
        // //   console.log('file exist', this.state.audioURL)
        // // )
        // //   .catch(err => {
        // //     console.log(err.message, err.code);
        // //   });
        // RNFS.exists(this.state.audioURL)
        //   .then((exists) => {
        //     if (exists) {
        //       console.log('file exist', this.state.audioURL);
        //     } else {
        //       console.log(" DOES NOT EXIST");
        //     }
        //   });
        // console.log('before upload')
        this.uploadAudio();
        // console.log('after upload')
        /* commented on 21/6/19 */
      }
      else if (event === 'Connected') {
        console.log('Call status', event)
      }
      else if (event === 'Incoming') {
        console.log('Call status', event)
      }
      else if (event === 'Dialing') {
        console.log('Call status', event)
      }
      else if (event === 'Offhook') {
        console.log('Call status', event)
        // var hr = moment().hour();
        // var mn = moment().second();
        // var scd = moment().second();
        // var startCall = moment.duration(hr, "hours") + "-" + moment.duration(mn, "minutes") + "-" + moment.duration(scd, "seconds")
        // var startCall = moment().hour() + "-" + moment().second() + "-" + moment().second();
        // this.setState({ startTime: startCall })
        // console.log('call start time', this.state.startTime)
      }
      else if (event === 'Missed') {
        console.log('Call status', event)
      }
    },
      false, // if you want to read the phone number of the incoming call [ANDROID], otherwise false
      () => { }, // callback if your permission got denied [ANDROID] [only if you want to read incoming number] default: console.error
      {
        title: 'Phone State Permission',
        message: 'This app needs access to your phone state in order to react and/or to adapt to incoming calls.'
      } // a custom permission request message to explain to your user, why you need the permission [recommended] - this is the default one
    )
  }

  stopListenerTapped() {
    this.callDetector && this.callDetector.dispose();
  }

  uploadAudio = async () => {

    try {
      // simple function to get image uri from device
      console.log('in fie upload')
      // const response = await  this.getimage();

      // console.log('after getImage', response)
      // use fetch API to convert the local image to a blob
      // for uploading to firebase
      const audioFile = "file:///data/user/0/com.adiclasses/files/CallRecordings/2019-06-21/call_18-37-49_OUT_.amr";
      // const audioFile = RNFetchBlob.fs.dirs.DocumentDir
      console.log('DocumentDir', audioFile)
      //  this.setState({ audioURL: audioFile })
      //   console.log("audioURL", this.state.audioURL)

      let dirs = RNFetchBlob.fs.dirs

      RNFetchBlob
        .config({
          // response data will be saved to this path if it has access right.

          path: dirs.DocumentDir + "/CallRecordings/2019-06-21/call_18-37-49_OUT_.amr"

        })
        .fetch('GET', 'file:///data/user/0/com.adiclasses/files/CallRecordings/2019-06-21/call_18-37-49_OUT_.amr', {
          //some headers ..
        })
        .then((res) => RNFetchBlob.fs.scanFile([{ path: res.path() }]))
        .then(() => {
          console.log('Success')
          console.log('audioURL', this.state.audioURL)
          console.log('res path ', res.path())

        })



      // const response2 = await fetch(this.state.audioURL)
      //const response2 = await RNFetchBlob.fetch(audioFile)
      // console.log('response2', response2)
      //const blob = await response2.blob();
      const blob = await this.state.audioURL.blob();
      console.log('blob')
      // now that we have the blob, it is uploading to 
      // firebase as described in the documentation
      const ref = audio_file.child(new Date().getTime() + "");

      // var path1="gs://adiclasses-f89d8.appspot.com/Location/" + new Date().getTime() +""
      // console.log('uploadedfileurl', path1)
      // var filename = new Date().getTime() + ".jpeg"
      // console.log('fileNamePath', filename)

      const task = await ref.put(blob)

      task.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot =>
          console.log(snapshot.bytesTransferred / snapshot.totalBytes * 100),
        error => {
          console.log("error", error);
          return error;
        },
        result => {
          console.log("result", task.snapshot.metadata);


          ref.getDownloadURL().then((url) => console.log("Filepath of firebase", url))

          // location.child(filename).getDownloadURL().then(url => {

          //     console.log('uploadedfileurl',url)

          //   });
          return result;
        }
      );
    } catch (e) {
      console.log(e);
    }
  };


  componentDidMount() {
    this.startListenerTapped();
    let dataItem = this.props.navigation.getParam("dataItem");
    let tempLead = this.props.navigation.getParam("leadtype");
    console.log("TempLead:" + tempLead);
    if (tempLead == "0") {
      this.setState({
        leadType: 0,
        b2bschoolName: dataItem.school,
        b2bCity: dataItem.city,
        b2bDistrict: dataItem.districtName,
        b2bState: dataItem.state,
        b2bPrincipalName: dataItem.principleName,
        b2bPrincipalMobile1: dataItem.mobile1,
        b2bPrincipalMobile2: dataItem.mobile2,
        b2bPrincipalEmail: dataItem.email,
        b2bContactPersonName: dataItem.contactPersonName,
        b2bContactPersonMobile: dataItem.mobile,
        b2bClass12Strength: dataItem.strength12,
        b2bClass11Strength: dataItem.strength11,
        b2b11thFee: dataItem.fee11,
        b2bClass10Strength: dataItem.strength10,
        b2b10thFee: dataItem.fee10,
        b2bDecisionMakerName: dataItem.decesionMakerName,
        b2bDecisionMakerMobile: dataItem.decesionMakerNumber,
        nextMeetDate: dataItem.meetingDate,
        nextMeetTime: dataItem.meetingTime,
        b2bResidential: dataItem.residentialCampus,
        b2b8910Foundation: dataItem.foundation8910,
        b2bInfrastructure: dataItem.infrastructure,
        b2bRemarks: dataItem.remark,
        leadId: dataItem.id,
        status: dataItem.status
      });
    } else {
      this.setState({
        leadId: dataItem.id,
        leadType: 1,
        status: dataItem.status,
        b2cStudentName: dataItem.studentName,
        b2cGuardianName: dataItem.gaurdianName,
        b2cStudentMobile1: dataItem.mobile1,
        b2cStudentMobile2: dataItem.mobile2,
        b2cStudentClass: dataItem.divisionClass,
        b2cSchoolName: dataItem.schoolOrCollege,
        b2cSchoolEmail: dataItem.email,
        b2cSchoolAddress: dataItem.address,
        b2cCity: dataItem.city,
        b2cState: dataItem.state,
        b2cFinancialStatus: dataItem.financialStatus,
        b2cPrincipalName: dataItem.principalName,
        b2cPrincipalMobile: dataItem.mobile,
        b2c8910foundation: dataItem.foundation8910,
        b2cCoaching: dataItem.coaching,
        b2cRemarks: dataItem.remark
      });
      console.log("Coaching Data Received::" + dataItem.coaching);
      var arrCoachings = JSON.stringify(dataItem.coaching)
        .replace('"', "")
        .split(",");
      arrCoachings.forEach(element => {
        console.log("Coachings Array:" + element);
        if (element == "CET") {
          this.setState({ CETchecked: true });
        }
        if (element == "IIT") {
          this.setState({ IITchecked: true });
          console.log("IIT");
        }
        if (element == "NEET") {
          this.setState({ NEETchecked: true });
        }
        if (element == "Advanced") {
          this.setState({ Advancedchecked: true });
        }
      });
    }
  }

  pickDate = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(this.state.nextMeetDate)
      });
      if (action === DatePickerAndroid.dismissedAction) {
        return;
      }
      let newDate = new Date(year, month, day);
      this.setState({ nextMeetDate: newDate.toLocaleDateString() });
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };
  pickTime = async () => {
    let temp = "";
    try {
      var populateHour = 0,
        populateMinutes = 0;
      if (this.state.nextMeetTime.substring(6) == "pm") {
        populateHour = 12;
      }
      populateHour =
        populateHour + parseInt(this.state.nextMeetTime.substring(0, 2));

      populateMinutes = parseInt(this.state.nextMeetTime.substring(3, 5));
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: populateHour,
        minute: populateMinutes
        //is24Hour: false // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)

        let tempMinutes = "" + minute;
        let tempHour = "" + hour;
        if (parseInt(minute) < 10) {
          tempMinutes = "0" + tempMinutes;
        }
        if (parseInt(hour) >= 12) {
          tempHour = parseInt(hour) - 12;
          temp = tempHour + ":" + tempMinutes + " pm";
        } else {
          temp = tempHour + ":" + tempMinutes + " am";
        }

        this.setState({ nextMeetTime: temp });
      }
    } catch ({ code, message }) {
      console.warn("Cannot open time picker", message);
    }
  };
  editB2BLeadAPI = () => {
    console.log("In editb2bLeadApi");
    fetch(EditB2BLeadURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        school: this.state.b2bschoolName,
        city: this.state.b2bCity,
        districtName: this.state.b2bDistrict,
        state: this.state.b2bState,
        principleName: this.state.b2bPrincipalName,
        mobile1: this.state.b2bPrincipalMobile1,
        mobile2: this.state.b2bPrincipalMobile2,
        email: this.state.b2bPrincipalEmail,
        contactPersonName: this.state.b2bContactPersonName,
        mobile: this.state.b2bContactPersonMobile,
        strength11: this.state.b2bClass11Strength,
        strength12: this.state.b2bClass12Strength,
        fee11: this.state.b2b11thFee,
        fee10: this.state.b2b10thFee,
        strength10: this.state.b2bClass10Strength,
        decesionMakerName: this.state.b2bDecisionMakerName,
        decesionMakerNumber: this.state.b2bDecisionMakerMobile,
        meetingDate: this.state.nextMeetDate,
        meetingTime: this.state.nextMeetTime,
        residentialCampus: this.state.b2bResidential,
        foundation8910: this.state.b2b8910Foundation,
        infrastructure: this.state.b2bInfrastructure,
        remark: this.state.b2bRemarks,
        leadId: this.state.leadId,
        status: this.state.status
      })
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        console.log("EditB2BLead Response", data);

        if (data.message == "succesfully updated") {
          //this._storeData(data.userId);
          Alert.alert("Lead Edited Successfully");
          this.props.navigation.navigate("DashBoard");
        } else if (data.message) {
          Alert.alert("Invalid Username or Password");
        }
      })
      .catch(error => {
        console.log("Api call error");
        console.log(error.message);
      });
  };

  editB2CLeadAPI = varcoaching => {
    console.log("In Editb2cLeadApi");
    fetch(EditB2CLeadURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        studentName: this.state.b2cStudentName,
        gaurdianName: this.state.b2cGuardianName,
        mobile1: this.state.b2cStudentMobile1,
        mobile2: this.state.b2cStudentMobile2,
        divisionClass: this.state.b2cStudentClass,
        schoolOrCollege: this.state.b2cSchoolName,
        email: this.state.b2cSchoolEmail,
        address: this.state.b2cSchoolAddress,
        city: this.state.b2cCity,
        state: this.state.b2cState,
        financialStatus: this.state.b2cFinancialStatus,
        principalName: this.state.b2cPrincipalName,
        mobile: this.state.b2cPrincipalMobile,
        coaching: varcoaching,
        foundation8910: this.state.b2c8910foundation,
        remark: this.state.b2cRemarks,
        status: this.state.status,
        leadID: this.state.leadId
      })
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        console.log("EDITB2CLead Response", data);

        if (data.message == "succesfully updated") {
          //this._storeData(data.userId);
          Alert.alert("Lead Edited Successfully");
          this.props.navigation.navigate("DashBoard");
        } else if (data.message) {
          Alert.alert(data.message);
        }
      })
      .catch(error => {
        console.log("Api call error");
        console.log(error.message);
      });
  };
  editLead() {
    if (this.state.leadType) {
      let tempCoaching = "";
      if (this.state.CETchecked) {
        tempCoaching += "CET,";
      }
      if (this.state.NEETchecked) {
        tempCoaching = "NEET,";
      }
      if (this.state.IITchecked) {
        tempCoaching += "IIT,";
      }
      if (this.state.Advancedchecked) {
        tempCoaching += "Advanced,";
      }
      this.editB2CLeadAPI(tempCoaching);
    } else {
      this.editB2BLeadAPI();
    }
    console.log("Call Edit");
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1, padding: 5 }}>
          <View style={styles.card}>
            <NameText>Select Status</NameText>
            <RadioForm
              radio_props={radio_props}
              initial={
                radio_props.find(item => {
                  if (
                    item.label ===
                    this.props.navigation.getParam("dataItem").status
                  )
                    return item;
                }).value
              }
              onPress={value => {
                let temp = radio_props.find(item => {
                  if (item.value === value) return item;
                }).label;

                this.setState({ status: temp });
              }}
              formHorizontal={false}
              labelHorizontal={true}
              animation={false}
              //buttonColor={"#fff"}
              labelStyle={{ fontSize: 15, padding: 5 }}
              buttonSize={10}
              buttonOuterSize={20}
            />
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.editLead()}
            >
              <Text style={styles.buttonText}>SAVE CHANGES</Text>
            </TouchableOpacity>
          </View>
          {this.state.leadType == 0 && (
            <View style={styles.card}>
              <View style={styles.flexColumn}>
                <NameText>School Name</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2Bcity.focus()}
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bschoolName}
                  onChangeText={text => {
                    this.setState({ b2bschoolName: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>City/Town</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2Bdistrict.focus()}
                  ref={input => (this.B2Bcity = input)}
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bCity}
                  onChangeText={text => {
                    this.setState({ b2bCity: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>District</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2Bstate.focus()}
                  ref={input => (this.B2Bdistrict = input)}
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bDistrict}
                  onChangeText={text => {
                    this.setState({ b2bDistrict: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>State</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2Bprincipal.focus()}
                  ref={input => (this.B2Bstate = input)}
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bState}
                  onChangeText={text => {
                    this.setState({ b2bState: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Principal Name</NameText>
                <TextInput
                  style={styles.input}
                  autoCorrect={false}
                  onSubmitEditing={() => this.B2BprincipalMobile1.focus()}
                  ref={input => (this.B2Bprincipal = input)}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bPrincipalName}
                  onChangeText={text => {
                    this.setState({ b2bPrincipalName: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Principal Mobile1</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2BprincipalMobile2.focus()}
                  ref={input => (this.B2BprincipalMobile1 = input)}
                  autoCorrect={false}
                  keyboardType="numeric"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bPrincipalMobile1}
                  onChangeText={text => {
                    this.setState({ b2bPrincipalMobile1: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Principal Mobile2</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2BprincipalEmail.focus()}
                  ref={input => (this.B2BprincipalMobile2 = input)}
                  autoCorrect={false}
                  keyboardType="numeric"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bPrincipalMobile2}
                  onChangeText={text => {
                    this.setState({ b2bPrincipalMobile2: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Email</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2BcontactPerson.focus()}
                  ref={input => (this.B2BprincipalEmail = input)}
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bPrincipalEmail}
                  onChangeText={text => {
                    this.setState({ b2bPrincipalEmail: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Contact Person</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2BcontactPersonMobile.focus()}
                  ref={input => (this.B2BcontactPerson = input)}
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bContactPersonName}
                  onChangeText={text => {
                    this.setState({ b2bContactPersonName: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Contact Person Mobile</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2Bclass12Strength.focus()}
                  ref={input => (this.B2BcontactPersonMobile = input)}
                  autoCorrect={false}
                  keyboardType="numeric"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bContactPersonMobile}
                  onChangeText={text => {
                    this.setState({ b2bContactPersonMobile: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>12th Class Strength</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2Bclass11Strength.focus()}
                  ref={input => (this.B2Bclass12Strength = input)}
                  autoCorrect={false}
                  keyboardType="numeric"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bClass12Strength}
                  onChangeText={text => {
                    this.setState({ b2bClass12Strength: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>11th Class Strength</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2Bs11thFee.focus()}
                  ref={input => (this.B2Bclass11Strength = input)}
                  autoCorrect={false}
                  keyboardType="numeric"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bClass11Strength}
                  onChangeText={text => {
                    this.setState({ b2bClass11Strength: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Fee</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2Bclass10Strength.focus()}
                  ref={input => (this.B2Bs11thFee = input)}
                  autoCorrect={false}
                  keyboardType="numeric"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2b11thFee}
                  onChangeText={text => {
                    this.setState({ b2b11thFee: text });
                  }}
                />
              </View>

              <View style={styles.flexColumn}>
                <NameText>10th Class Strength</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2Bs10thFee.focus()}
                  ref={input => (this.B2Bclass10Strength = input)}
                  autoCorrect={false}
                  keyboardType="numeric"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bClass10Strength}
                  onChangeText={text => {
                    this.setState({ b2bClass10Strength: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Fee</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2BDecisionMaker.focus()}
                  ref={input => (this.B2Bs10thFee = input)}
                  autoCorrect={false}
                  keyboardType="numeric"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2b10thFee}
                  onChangeText={text => {
                    this.setState({ b2b10thFee: text });
                  }}
                />
              </View>

              <View style={styles.flexColumn}>
                <NameText>Decision Maker</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2BDecisionMakerMobile.focus()}
                  ref={input => (this.B2BDecisionMaker = input)}
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bDecisionMakerName}
                  onChangeText={text => {
                    this.setState({ b2bDecisionMakerName: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Decision Maker Mobile</NameText>
                <TextInput
                  style={styles.input}
                  //onSubmitEditing={() => this.B2Bclass12Strength.focus()}
                  ref={input => (this.B2BDecisionMakerMobile = input)}
                  autoCorrect={false}
                  keyboardType="numeric"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bDecisionMakerMobile}
                  onChangeText={text => {
                    this.setState({ b2bDecisionMakerMobile: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Next Meeting Date and Time</NameText>

                <TouchableOpacity
                  onPress={() => {
                    if (this.state.editable) this.pickDate();
                  }}
                  style={styles.input}
                >
                  <Text
                    style={{
                      color: "#fff",

                      fontSize: 20,
                      textAlign: "center"
                    }}
                  >
                    {this.state.nextMeetDate}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    if (this.state.editable) this.pickTime();
                  }}
                  style={styles.input}
                >
                  <Text
                    style={{
                      color: "#fff",

                      fontSize: 20,
                      textAlign: "center"
                    }}
                  >
                    {this.state.nextMeetTime}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.flexColumn}>
                <NameText>8,9,10 Foundation</NameText>
                {this.state.editable ? (
                  <RadioForm
                    radio_props={foundation_props}
                    initial={
                      foundation_props.find(item => {
                        if (item.label === this.state.b2b8910Foundation)
                          return item;
                      }).value
                    }
                    onPress={value => {
                      let temp = foundation_props.find(item => {
                        if (item.value === value) return item;
                      }).label;
                      this.setState({
                        b2b8910Foundation: temp
                      });
                    }}
                    formHorizontal={false}
                    labelHorizontal={true}
                    animation={false}
                    //buttonColor={"#fff"}
                    labelStyle={{ fontSize: 15, paddingLeft: 5 }}
                    buttonSize={10}
                    buttonOuterSize={20}
                  />
                ) : (
                    <TextInput
                      style={styles.input}
                      editable={false}
                      value={this.state.b2b8910Foundation}
                    />
                  )}
              </View>
              <View style={styles.flexColumn}>
                <NameText>Residential Campus</NameText>
                {this.state.editable ? (
                  <RadioForm
                    radio_props={foundation_props}
                    initial={
                      foundation_props.find(item => {
                        if (item.label === this.state.b2bResidential)
                          return item;
                      }).value
                    }
                    formHorizontal={false}
                    labelHorizontal={true}
                    animation={false}
                    //buttonColor={"#fff"}
                    labelStyle={{ fontSize: 15, paddingLeft: 5 }}
                    buttonSize={10}
                    buttonOuterSize={20}
                    onPress={value => {
                      let temp = foundation_props.find(item => {
                        if (item.value === value) return item;
                      }).label;
                      this.setState({
                        b2bResidential: temp
                      });
                    }}
                  />
                ) : (
                    <TextInput
                      style={styles.input}
                      editable={false}
                      value={this.state.b2bResidential}
                    />
                  )}
              </View>

              <View style={styles.flexColumn}>
                <NameText>Infrastructure</NameText>
                {this.state.editable ? (
                  <RadioForm
                    radio_props={infrastucture_props}
                    initial={
                      infrastucture_props.find(item => {
                        if (item.label == this.state.b2bInfrastructure)
                          return item;
                      }).value
                    }
                    onPress={value => {
                      let temp = infrastucture_props.find(item => {
                        if (item.value === value) return item;
                      }).label;
                      this.setState({
                        b2bInfrastructure: temp
                      });
                    }}
                    formHorizontal={true}
                    labelHorizontal={true}
                    animation={true}
                    //buttonColor={"#fff"}
                    labelStyle={{ fontSize: 15, padding: 5 }}
                    buttonSize={10}
                    buttonOuterSize={20}
                  />
                ) : (
                    <TextInput
                      style={styles.input}
                      editable={false}
                      value={this.state.b2bInfrastructure}
                    />
                  )}
              </View>
              <View style={styles.flexColumn}>
                <NameText>Remarks</NameText>
                <TextInput
                  style={styles.multilineInput}
                  //onSubmitEditing={() => this.B2Bclass12Strength.focus()}
                  multiline={true}
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bRemarks}
                  onChangeText={text => {
                    this.setState({ b2bRemarks: text });
                  }}
                />
              </View>
              <View style={styles.flexRow}>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => {
                    if (this.state.editable) {
                      this.editLead();
                    }
                    this.setState({ editable: !this.state.editable });
                  }}
                >
                  {this.state.editable ? (
                    <Text style={styles.buttonText}>SAVE </Text>
                  ) : (
                      <Text style={styles.buttonText}>EDIT </Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => {
                    RNImmediatePhoneCall.immediatePhoneCall(
                      this.state.b2bContactPersonMobile
                    );
                  }}
                >
                  <Text style={styles.buttonText}>CALL</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {this.state.leadType == 1 && (
            <View style={styles.card}>
              <View style={styles.flexColumn}>
                <NameText>Student Name</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2CguardianNameInput.focus()}
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2cStudentName}
                  onChangeText={text => {
                    this.setState({ b2cStudentName: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Guardian Name</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2Cmobile1input.focus()}
                  ref={input => (this.B2CguardianNameInput = input)}
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2cGuardianName}
                  onChangeText={text => {
                    this.setState({ b2cGuardianName: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Mobile 1</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2Cmobile2input.focus()}
                  ref={input => (this.B2Cmobile1input = input)}
                  autoCorrect={false}
                  keyboardType="numeric"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2cStudentMobile1}
                  onChangeText={text => {
                    this.setState({ b2cStudentMobile1: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Mobile 2</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2CschoolNameInput.focus()}
                  ref={input => (this.B2Cmobile2input = input)}
                  autoCorrect={false}
                  keyboardType="numeric"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2cStudentMobile2}
                  onChangeText={text => {
                    this.setState({ b2cStudentMobile2: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Class</NameText>
                {this.state.editable ? (
                  <RadioForm
                    radio_props={b2cClass_props}
                    initial={
                      b2cClass_props.find(item => {
                        if (item.label === this.state.b2cStudentClass)
                          return item;
                      }).value
                    }
                    formHorizontal={false}
                    labelHorizontal={true}
                    animation={false}
                    //buttonColor={"#fff"}
                    labelStyle={{ fontSize: 15, paddingLeft: 5 }}
                    buttonSize={10}
                    buttonOuterSize={20}
                    onPress={value => {
                      let temp = b2cClass_props.find(item => {
                        if (item.value === value) return item;
                      }).label;
                      this.setState({
                        b2cStudentClass: temp
                      });
                    }}
                  />
                ) : (
                    <TextInput
                      style={styles.input}
                      editable={false}
                      value={this.state.b2cStudentClass}
                    />
                  )}
              </View>
              <View style={styles.flexColumn}>
                <NameText>School/College Name</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2CemailInput.focus()}
                  ref={input => (this.B2CschoolNameInput = input)}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2cSchoolName}
                  onChangeText={text => {
                    this.setState({ b2cSchoolName: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Email Address</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2CaddressInput.focus()}
                  ref={input => (this.B2CemailInput = input)}
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2cSchoolEmail}
                  onChangeText={text => {
                    this.setState({ b2cSchoolEmail: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Address</NameText>
                <TextInput
                  style={styles.input}
                  multiline={true}
                  autoCorrect={false}
                  onSubmitEditing={() => this.B2CcityInput.focus()}
                  ref={input => (this.B2CaddressInput = input)}
                  keyboardType="default"
                  editable={this.state.editable}
                  value={this.state.b2cSchoolAddress}
                  onChangeText={text => {
                    this.setState({ b2cSchoolAddress: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>City</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2CstateInput.focus()}
                  ref={input => (this.B2CcityInput = input)}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2cCity}
                  onChangeText={text => {
                    this.setState({ b2cCity: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>State</NameText>
                <TextInput
                  style={styles.input}
                  autoCorrect={false}
                  onSubmitEditing={() => this.B2CprincipalNameInput.focus()}
                  ref={input => (this.B2CstateInput = input)}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2cState}
                  onChangeText={text => {
                    this.setState({ b2cState: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Financial Status</NameText>
                {this.state.editable ? (
                  <RadioForm
                    radio_props={studentFinanceStatus_props}
                    initial={
                      studentFinanceStatus_props.find(item => {
                        if (item.label === this.state.b2cFinancialStatus)
                          return item;
                      }).value
                    }
                    formHorizontal={false}
                    labelHorizontal={true}
                    animation={false}
                    //buttonColor={"#fff"}
                    labelStyle={{ fontSize: 15, paddingLeft: 5 }}
                    buttonSize={10}
                    buttonOuterSize={20}
                    onPress={value => {
                      let temp = studentFinanceStatus_props.find(item => {
                        if (item.value === value) return item;
                      }).label;
                      this.setState({
                        b2cFinancialStatus: temp
                      });
                    }}
                  />
                ) : (
                    <TextInput
                      style={styles.input}
                      editable={false}
                      value={this.state.b2cFinancialStatus}
                    />
                  )}
              </View>
              <View style={styles.flexColumn}>
                <NameText>Principal Name</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2CprincipalMobileInput.focus()}
                  ref={input => (this.B2CprincipalNameInput = input)}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2cPrincipalName}
                  onChangeText={text => {
                    this.setState({ b2cPrincipalName: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Principal Mobile</NameText>
                <TextInput
                  style={styles.input}
                  ref={input => (this.B2CprincipalMobileInput = input)}
                  autoCorrect={false}
                  keyboardType="numeric"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2cPrincipalMobile}
                  onChangeText={text => {
                    this.setState({ b2cPrincipalMobile: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>8,9,10 Foundation</NameText>
                {this.state.editable ? (
                  <View>
                    <RadioForm
                      radio_props={foundation_props}
                      initial={
                        foundation_props.find(item => {
                          if (item.label === this.state.b2c8910foundation)
                            return item;
                        }).value
                      }
                      onPress={value => {
                        let temp = foundation_props.find(item => {
                          if (item.value === value) return item;
                        }).label;
                        this.setState({
                          b2c8910foundation: temp
                        });
                      }}
                      formHorizontal={false}
                      labelHorizontal={true}
                      animation={false}
                      //buttonColor={"#fff"}
                      labelStyle={{ fontSize: 15, paddingLeft: 5 }}
                      buttonSize={10}
                      buttonOuterSize={20}
                    />
                    <NameText>Coaching</NameText>

                    <CheckBox
                      title="CET"
                      checked={this.state.CETchecked}
                      onPress={() =>
                        this.setState({ CETchecked: !this.state.CETchecked })
                      }
                    />
                    <CheckBox
                      title="NEET"
                      checked={this.state.NEETchecked}
                      onPress={() =>
                        this.setState({ NEETchecked: !this.state.NEETchecked })
                      }
                    />
                    <CheckBox
                      title="IIT"
                      checked={this.state.IITchecked}
                      onPress={() =>
                        this.setState({ IITchecked: !this.state.IITchecked })
                      }
                    />
                    <CheckBox
                      title="Advanced"
                      checked={this.state.Advancedchecked}
                      onPress={() =>
                        this.setState({
                          Advancedchecked: !this.state.Advancedchecked
                        })
                      }
                    />
                  </View>
                ) : (
                    <View>
                      <TextInput
                        style={styles.input}
                        editable={false}
                        value={this.state.b2c8910foundation}
                      />
                      <NameText>Coaching</NameText>
                      <TextInput
                        style={styles.input}
                        editable={false}
                        value={this.state.b2cCoaching}
                      />
                    </View>
                  )}
              </View>
              <View style={styles.flexColumn}>
                <NameText>Remarks</NameText>
                <TextInput
                  style={styles.multilineInput}
                  //onSubmitEditing={() => this.B2Bclass12Strength.focus()}
                  multiline={true}
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2cRemarks}
                  onChangeText={text => {
                    this.setState({ b2cRemarks: text });
                  }}
                />
              </View>
              <View style={styles.flexRow}>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => {
                    if (this.state.editable) {
                      this.editLead();
                    }
                    this.setState({ editable: !this.state.editable });
                  }}
                >
                  {this.state.editable ? (
                    <Text style={styles.buttonText}>SAVE </Text>
                  ) : (
                      <Text style={styles.buttonText}>EDIT </Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => {
                    Linking.openURL("tel:" + this.state.b2cStudentMobile1);
                  }}
                >
                  <Text style={styles.buttonText}>CALL</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    backgroundColor: "#031828",
    flexDirection: "column"
  },

  flexRow: {
    flexDirection: "row"
  },
  flexColumn: {
    flexDirection: "column",
    marginTop: 5,
    justifyContent: "center"
  },
  card: {
    backgroundColor: "#ced9e4",
    padding: 15,
    borderWidth: 1,
    borderColor: "#2F4F4F",
    margin: 10,
    flexDirection: "column",
    elevation: 4,
    flex: 1,
    borderRadius: 5
  },
  input: {
    height: 30,
    backgroundColor: "#2c3e50",
    marginBottom: 10,
    padding: 5,
    fontSize: 20,
    color: "#fff",
    flex: 1
  },
  multilineInput: {
    backgroundColor: "#2c3e50",
    marginBottom: 10,
    padding: 5,
    fontSize: 20,
    color: "#fff",
    flex: 1
  },
  buttonContainer: {
    backgroundColor: "#2980b6",
    paddingVertical: 15,
    flex: 1,
    margin: 10
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  }
});
const NameText = styled.Text`
  height: 25px;
  font-size: 17px;
  font-weight: 300;
  font-style: normal;
  color: rgba(3, 15, 41, 0.9);
  text-align: center;
  flex: 0.7;
`;
