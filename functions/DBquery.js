import {MMKV} from 'react-native-mmkv';
import {database, firebaseAuth} from '../api/firebaseConfig';
import {get, ref} from 'firebase/database';

class DBquery {
  storage = new MMKV();

  checkStats() {
    let levels = this.setScore();
    let data2 = [];
    levels.forEach(level => {
      if (level.level != undefined) {
        data2.push({
          label: `${level.materia}`,
          value: level.level,
        });
      }
    });

    return data2;
  }
  setScore() {
    const completedQuests = this.getQuests('completedQuests');

    let stackLevels = [];

    let questoes = this.getQuests('questoes');

    questoes.forEach(quest => {
      stackLevels.push({
        materia: quest.value,
        value: 0,
        totalScore: 0,
        level: 0,
      });
    });

    stackLevels.push({
      materia: 'Todos',
      value: 0,
      totalScore: 0,
    });

    completedQuests.forEach(completedQuest => {
      stackLevels.forEach(materia => {
        if (materia.materia === completedQuest.topic) {
          materia.totalScore += completedQuest.reward;
          let currentXPMateria = materia.totalScore;
          let currentLevelMateria = 1;
          let nedeedXP = 100 * currentLevelMateria;

          while (currentXPMateria >= currentLevelMateria * 100) {
            currentLevelMateria += 1;
            currentXPMateria -= nedeedXP;
            nedeedXP = 100 * currentLevelMateria;
          }
          materia.level = currentLevelMateria;
          materia.value = currentXPMateria / nedeedXP;
          materia.value = parseFloat(materia.value.toFixed(2));
        }
      });

      stackLevels[stackLevels.length - 1].totalScore += completedQuest.reward;
    });

    this.storage.set('levels', JSON.stringify(stackLevels));

    const result = this.getQuests('levels');

    return result;
  }

  deleteAll() {
    this.storage.clearAll();
  }
  getMateria(className) {
    let questoes = this.getQuests('questoes');

    let query = {};
    questoes.forEach(quest => {
      if (quest.materia === className) {
        query = quest;
      }
    });

    return query;
  }
  getQuests(collectionName) {
    const collectionString = this.storage.getString(collectionName);

    const Quests = collectionString ? JSON.parse(collectionString) : [];

    return Quests;
  }

  getQuestTopic(QuestList) {
    return QuestList.topico;
  }

  setQuests(Quest, QuestList) {
    this.storage.set(Quest.class, JSON.stringify(QuestList));
  }

  addQuest(quest, questList) {
    let Quests = [];
    Quests = this.getQuests(questList);

    Quests.push(quest);

    this.storage.set(questList, JSON.stringify(Quests));
  }

  DeleteList() {
    this.storage.set('currentQuests', JSON.stringify([]));
    // this.storage.setString('completedQuests', JSON.stringify([]))
    this.storage.set('dailyQuests', JSON.stringify([]));
    this.storage.set('sideQuests', JSON.stringify([]));
    // this.storage.setString('bossQuests', JSON.stringify([]))
  }

  Recover = async () => {
    try {
      // const salt = await bcrypt.getSalt(saltRounds);
      // const hash = await bcrypt.hash(salt, firebaseAuth.currentUser.email);
      const uid = firebaseAuth.currentUser.uid;
      const snapshot = await get(ref(database, `users/${uid}/main`));
      let snapshotGetted = snapshot.val();
      if (snapshotGetted) {
        let collectedData = [
          {list: 'mainQuests', ...snapshotGetted['mainQuests ']},
          {list: 'currentQuests', ...snapshotGetted['currentQuests ']},
          {list: 'completedQuests', ...snapshotGetted['completedQuests ']},
          {list: 'dailyQuests', ...snapshotGetted['dailyQuests ']},
          {list: 'sideQuests', ...snapshotGetted['sideQuests ']},
          {list: 'questoes', ...snapshotGetted['questoes ']},
        ];

        collectedData.forEach(element => {
          if (element.quests) {
            this.storage.set(element.list, JSON.stringify(element.quests));
          } else {
            this.storage.delete(element.list);
          }
        });
      }
    } catch (error) {
      console.log('algo deu errado ' + error);
    }
  };

  updateQuests(
    Quest,
    name,
    description,
    questList,
    completedResponse,
    quantity,

    topico,
  ) {
    let topicT = {};
    let questoes = this.getQuests('questoes');

    questoes.forEach(element => {
      if (element.value == topico) {
        topicT = element;
      }
    });
    let updatedQuest = {
      ...Quest,
      name: name,
      description: description,
      class: questList,
      completed: completedResponse,
      quantity: quantity,
      topic: topicT.value,

      reward: quantity * topicT.xp,
    };

    this.deleteQuest(Quest);
    this.addQuest(updatedQuest, questList);
  }

  deleteQuest(Quest) {
    const Quests = this.getQuests(Quest.class);

    let updatedQuestList = Quests.filter(quest => quest.id !== Quest.id);

    this.storage.set(Quest.class, JSON.stringify(updatedQuestList));
  }

  checkLevel() {
    let ActualLevel = 1;
    let totalXP = this.setScore();

    let letCurrentXP = totalXP[totalXP.length - 1].totalScore;
    let s = 100 * ActualLevel;

    while (letCurrentXP >= s) {
      ActualLevel++;
      letCurrentXP -= s;
      s = 100 * ActualLevel;
    }

    return {
      letlevel: ActualLevel,
      letCurrentXP: letCurrentXP,
      letNedeedXP: 100 * ActualLevel,
    };
  }

  createNewQuestType(obj, name) {
    // Novo tipo de quest selecionável

    let stored = this.storage.getString('questoes');
    let currentTypes = stored ? JSON.parse(stored) : [];

    if (currentTypes.some(quest => quest.value === name)) {
      alert('It already exists');
    } else {
      if (obj) {
        const index = currentTypes.findIndex(quest => quest.id === obj.id);
        if (index !== -1) {
          currentTypes[index] = {...obj, value: name};
          this.storage.set('questoes', JSON.stringify(currentTypes));
        }
      } else {
        let newObject = {
          id: currentTypes.length + 1,
          value: name,
          xp: 1,
        };

        let newArray = [...currentTypes, newObject];
        this.storage.set('questoes', JSON.stringify(newArray));
      }
    }
  }
}

export default DBquery;
