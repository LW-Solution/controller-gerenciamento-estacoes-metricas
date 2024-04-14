import IAlert from "./IAlert";
import IMeasure from "./IMeasure";

interface IOccurrence {
    id_occurrence?: number;
    alertIdAlert?: IAlert;
    measureIdMeasure?: IMeasure;
}

export default IOccurrence;
