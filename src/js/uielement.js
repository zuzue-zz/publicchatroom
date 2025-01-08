import { formatDistance, subDays } from "date-fns";

export function UiElement(divele) {

    const userInfoEle = (data) => {

        const uid = data.uid;
        const email = data.email;
        const fullname = data.displayName;
        const photourl = data.photoURL;
        const createdtime = data.metadata.creationTime;


        // const getdata = new Date(createdtime);
        // const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        // const getmonth = new Date(createdtime).getMonth();
        // const getyear = new Date(createdtime).getFullYear();
        // const formatteddate = `${getdata.getDate()} ${months[getmonth]} ${getyear}`;

        // Use dateFns.format provided by the CDN
        const formatteddate = dateFns.format(new Date(createdtime), "dd MMM yyyy");
        console.log(formatteddate);

        const html = `
            <img src="${photourl}" width="80" alt="profile icon" />
            <p>UID : ${uid}</p>
            <p>Display Name : ${fullname}</p>
            <p>Email : ${email}</p>
            <p>Create At : ${formatteddate}</p>
        `;

        divele.innerHTML = html;
    };
    return {
        userInfoEle
    };
}
