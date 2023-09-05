import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import normalize from 'react-native-normalize';
import theme from '../../theme';
import {useNavigation} from '@react-navigation/native';

const DashboardArticle = ({articles}) => {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(() =>
    articles?.Active === 1 ? true : false,
  );
  const [likeCount, setLikeCount] = useState(() => articles?.No_of_Likes);

  const likeHandler = () => {
    // Toggle the liked state locally
    setLiked(prevValue => !prevValue);

    // Update the like count based on the liked state
    setLikeCount(prevValue => (liked ? prevValue - 1 : prevValue + 1));
  };

  const fetchArticle = () => {
    if (articles?.Category_Type === 'article') {
      return (
        <View style={styles.articleItem}>
          <View style={styles.writerInfo}>
            <View>
              <Image
                style={styles.writeImage}
                source={
                  articles.img_file_name
                    ? {uri: articles.img_file_name}
                    : require('../../assets/male.png')
                }
              />
            </View>
            <View style={styles.writerDesc}>
              <Text
                style={styles.writerName}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                {articles.First_Name} {articles.Last_Name}
              </Text>
            </View>
          </View>
          <View style={styles.articleTitle}>
            <Text
              style={styles.titleText}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              {articles.Title}
            </Text>
          </View>
          <View style={styles.articleDesc}>
            <Text
              style={styles.descriptionText}
              numberOfLines={3}
              ellipsizeMode={'tail'}>
              {articles.Description}
            </Text>
          </View>
          <View style={styles.articleImage}>
            <Image
              style={{width: '100%', height: 150, resizeMode: 'cover'}}
              source={
                articles.Image
                  ? {uri: articles.Image}
                  : require('../../assets/pic2.png')
              }
            />
          </View>
        </View>
      );
    } else if (articles?.Category_Type === 'job') {
      return (
        <View style={styles.jobItem}>
          <View>
            <Image
              style={{width: 100, height: 100, resizeMode: 'contain'}}
              source={
                articles.Image
                  ? {uri: articles.Image}
                  : require('../../assets/pic2.png')
              }
            />
          </View>
          <View style={styles.jobDetails}>
            <Text style={styles.jobTitle}>{articles.Title}</Text>
            <Text style={styles.jobType}>{articles.Job_Type}</Text>
            <Text style={styles.jobOrganiser}>{articles.Organiser}</Text>
            <Text style={styles.jobLocation}>{articles.Location}</Text>
          </View>
        </View>
      );
    } else if (articles?.Category_Type === 'webinar') {
      return (
        <View style={styles.webinarItem}>
          <Text style={styles.webinarText}>Webinar</Text>
          <Text style={styles.webinarTitle}>{articles.Title}</Text>
          <Text style={styles.webinarOrganiser}>{articles.Organiser}</Text>
          <Text style={styles.webinarBrief}>{articles.Brief}</Text>
          <Image
            style={styles.webinarImage}
            source={
              articles.Image
                ? {uri: articles.Image}
                : require('../../assets/pic3.jpg')
            }
          />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('article', {
              articles: articles,
            })
          }
          activeOpacity={0.5}>
          {fetchArticle()}
        </TouchableOpacity>
        <View style={styles.likeSection}>
          <View style={styles.likeButton}>
            <TouchableOpacity onPress={likeHandler} activeOpacity={0.5}>
              {liked ? (
                <AntDesign
                  name="like1"
                  size={24}
                  color="#1b76f2" // Color when liked
                />
              ) : (
                <AntDesign
                  name="like1"
                  size={24}
                  color="lightgrey" // Color when not liked
                />
              )}
            </TouchableOpacity>
            <Text style={styles.likeText}>{likeCount} Likes</Text>
          </View>
          <View style={styles.likeButton}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('article', {
                  PostId: articles.PostId,
                  addComment: true,
                })
              }
              activeOpacity={0.5}>
              <FontAwesome name="comment" size={24} color="lightgrey" />
            </TouchableOpacity>
            <Text style={styles.likeText}>
              {articles?.No_of_Comments} Comments
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderRadius: normalize(5),
    backgroundColor: theme.colors.white,
    marginVertical: normalize(5),
    marginHorizontal: normalize(10),
  },
  articleItem: {
    marginBottom: normalize(5),
    minHeight: normalize(100),
  },
  writerInfo: {
    flexDirection: 'row',
    borderBottomWidth: normalize(3),
    borderBottomColor: theme.colors.border,
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(5),
    width: '100%',
  },
  writerDesc: {
    justifyContent: 'center',
    width: '85%',
  },
  writeImage: {
    width: normalize(35),
    height: normalize(35),
    borderRadius: normalize(100),
  },
  writerName: {
    fontWeight: theme.fontWeight.bold,
    fontSize: normalize(16),
    paddingLeft: normalize(5),
    color: theme.colors.black,
  },
  category: {
    backgroundColor: '#74d848',
    color: theme.colors.white,
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(3),
    borderRadius: normalize(5),
    alignSelf: 'center',
  },
  articleTitle: {
    borderBottomWidth: normalize(3),
    borderBottomColor: theme.colors.border,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: normalize(18),
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(5),
    lineHeight: normalize(24),
  },
  articleDesc: {
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(5),
  },
  descriptionText: {
    lineHeight: normalize(20),
    fontSize: normalize(16),
    width: '100%',
  },
  articleImage: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalize(5),
  },
  jobItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(3),
  },
  jobDetails: {
    paddingLeft: normalize(10),
  },
  jobTitle: {
    fontSize: normalize(16),
    fontWeight: theme.fontWeight.bold,
  },
  jobType: {
    paddingVertical: normalize(5),
    fontSize: normalize(15),
  },
  jobOrganiser: {
    fontSize: normalize(15),
  },
  jobLocation: {
    paddingVertical: normalize(5),
    fontSize: normalize(15),
  },
  webinarItem: {
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(5),
  },
  webinarText: {
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(3),
    backgroundColor: '#74d848',
    color: theme.colors.white,
    fontSize: normalize(16),
    fontWeight: theme.fontWeight.bold,
    borderRadius: normalize(10),
    alignSelf: 'flex-start',
    marginBottom: normalize(5),
  },
  webinarTitle: {
    fontSize: normalize(17),
    fontWeight: theme.fontWeight.bold,
    paddingVertical: normalize(3),
  },
  webinarOrganiser: {
    fontSize: normalize(16),
  },
  webinarBrief: {
    paddingVertical: normalize(3),
    fontSize: normalize(16),
  },
  webinarImage: {
    width: '100%',
    height: normalize(100),
    resizeMode: 'cover',
    marginTop: normalize(10),
  },
  likeSection: {
    flexDirection: 'row',
    borderTopColor: theme.colors.border,
    borderTopWidth: normalize(3),
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(40),
    paddingLeft: normalize(5),
  },
  likeText: {
    paddingLeft: normalize(10),
    fontSize: normalize(16),
    color: '#ccc',
  },
});

export default DashboardArticle;
