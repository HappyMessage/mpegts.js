interface ProgramToPMTPIDMap {
    [program: number]: number;
}

export class PAT {
    version_number: number;
    network_pid: number;
    // program_number -> pmt_pid
    program_pmt_pid: ProgramToPMTPIDMap = {};
}

export enum StreamType {
    kMPEG1Audio = 0x03,
    kMPEG2Audio = 0x04,
    kPESPrivateData = 0x06,
    kADTSAAC = 0x0F,
    kID3 = 0x15,
    kH264 = 0x1b,
    kH265 = 0x24
}

interface PIDToStreamTypeMap {
    [pid: number]: StreamType;
}

export class PMT {
    program_number: number;
    version_number: number;
    pcr_pid: number;
    // pid -> stream_type
    pid_stream_type: PIDToStreamTypeMap = {};

    common_pids: {
        h264: number | undefined,
        adts_aac: number | undefined
    } = {
        h264: undefined,
        adts_aac: undefined
    };

    pes_private_data_pids: {
        [pid: number]: boolean
    } = {};
}

export interface ProgramToPMTMap {
    [program: number]: PMT;
}

export class PESData {
    pid: number;
    data: Uint8Array;
    stream_type: StreamType;
    file_position: number;
}

export class PESSliceQueue {
    slices: Uint8Array[] = [];
    total_length: number = 0;
    file_position: number = 0;
}

export interface PIDToPESSliceQueues {
    [pid: number]: PESSliceQueue;
}
