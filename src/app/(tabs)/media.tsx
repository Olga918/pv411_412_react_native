import { useState } from "react";
import { useAudioPlayer } from 'expo-audio'
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from "react-native";
import { Container } from "@/components/ui/container";
import { SafeAreaView } from "react-native-safe-area-context";

const MediaScreen = () => {
    const [currentVideo, setCurrentVideo] = useState(0)
    const audioPlayer = useAudioPlayer(require('../../../assets/audio/audio.mp3'))
    const videos = [
        require(`../../../assets/videos/cat1.mp4`),
        require(`../../../assets/videos/cat2.mp4`),
        require(`../../../assets/videos/cat3.mp4`),
        require(`../../../assets/videos/cat4.mp4`),
    ]


    const player = useVideoPlayer(videos[currentVideo], player => {
        player.loop = true;
    })

    return (
        <SafeAreaView>
            <ScrollView>
                <Container style={{ height: 500, paddingVertical: 15, gap: 2 }}>
                    <VideoView style={styles.video} player={player} allowsPictureInPicture />
                    <TouchableOpacity style={[styles.nextButton, {
                        height: '10%',
                    }]} onPress={async () => {

                        await player.replaceAsync(videos[currentVideo + 1])
                        setCurrentVideo(currentVideo + 1)
                        if (currentVideo + 1 === videos.length) {
                            setCurrentVideo(0)
                        }
                    }}>
                        <Text style={styles.nextButtonText}>Next</Text>
                    </TouchableOpacity>
                </Container>
                <Container>
                    <TouchableOpacity style={[styles.nextButton, { backgroundColor: "#268844", marginVertical: 5 }]} onPress={() => {
                        audioPlayer.seekTo(0)
                        audioPlayer.play();
                    }}>
                        <Text style={styles.nextButtonText}>Play</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.nextButton, { backgroundColor: "#af5252" }]} onPress={() => audioPlayer.pause()}>
                        <Text style={styles.nextButtonText}>Stop</Text>
                    </TouchableOpacity>
                </Container>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    video: {
        width: '100%',
        height: '90%',
        objectFit: 'contain',
        borderRadius: 8,
        marginBottom: 5
    },
    nextButton: {
        backgroundColor: '#91345b',
        borderRadius: 8,
        justifyContent: 'center',
        paddingVertical: 10
    },
    nextButtonText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'white',
        textTransform: "uppercase",
        fontWeight: 'bold'
    }
})

export default MediaScreen;