import { ProfileContext, ProfileProps } from "../components/context/ProfileContext";
import { useContext } from "react";
import Link from "next/link";
import Head from "next/head";

const Home: React.FC<{ loggedIn: boolean }> = () => {
  const { loggedIn } = useContext<ProfileProps>(ProfileContext);
  return (
    <>
      <Head>
        <title>Poli</title>
      </Head>
      {loggedIn ? (
        <div className="m-3 flex justify-around bg-gray-800 text-gray-300">
          <h1>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, facere. Officia dignissimos ex expedita
            dolore laboriosam enim minima amet sequi, velit veniam tenetur recusandae eum obcaecati fuga beatae
            exercitationem et? Sequi aliquam, accusantium necessitatibus ex amet temporibus impedit architecto autem
            commodi ullam praesentium iure minus? Asperiores veritatis voluptas sit sed dolores odit. Laudantium,
            impedit. Excepturi natus nesciunt rem impedit perspiciatis! Voluptate quo, eveniet iusto alias unde,
            voluptatum officiis, ea neque suscipit ipsa nemo ratione ab. Nisi illum adipisci quod debitis odio nobis,
            ipsam repudiandae quaerat minus porro autem impedit reiciendis? Eos deserunt quo ex eius earum at dolore
            velit voluptas, dignissimos porro praesentium quis? Hic voluptatem rerum laborum inventore officia quam
            pariatur, in atque possimus mollitia nobis distinctio aspernatur ut. Voluptate rerum neque ipsam repudiandae
            mollitia totam, sed necessitatibus provident veniam et ducimus, fugiat earum voluptates blanditiis
            perspiciatis. Quaerat tempore vero soluta non porro doloremque numquam possimus reprehenderit laudantium
            dicta. Fugiat numquam, debitis consequatur esse vero, iusto hic laudantium repellat totam provident delectus
            laborum quae ut doloribus eveniet. Eligendi cumque laudantium consectetur culpa voluptatum fuga id nisi
            cupiditate sunt possimus? Quod nobis fugiat ea sint quidem commodi nisi itaque, architecto ad rerum
            cupiditate in ratione placeat ex illum tenetur? Esse nostrum quo sint. Distinctio rerum atque debitis ipsum
            dolore. Tempore. Dignissimos minima iure, voluptate eveniet voluptates alias repellat iste, deserunt, quis
            eligendi laudantium iusto? Exercitationem ducimus iure corrupti recusandae eos temporibus saepe eius quod ex
            ut, ipsa voluptatibus, illo nobis! Inventore unde quae autem possimus. Similique vitae magnam dolores sit
            blanditiis id, sed harum impedit quaerat aut, cumque hic facere dicta ullam quibusdam cum fuga! Est expedita
            vitae animi illo! Obcaecati ea, quis, quas ullam minus assumenda nesciunt amet repellendus dignissimos, hic
            provident in! Porro voluptatem saepe eos aperiam voluptatum tempore quas, aliquam quia beatae, laudantium
            nostrum, vel quod minima. Ducimus architecto aliquam, reprehenderit consequuntur soluta enim porro quisquam
            fuga aut corporis itaque perferendis sed odit nemo nam, dignissimos nulla. Natus, assumenda nisi! Nisi
            repellendus, minus eum magnam repellat libero? Vero officia, mollitia facere quaerat asperiores culpa qui
            similique cum, nulla laudantium magni possimus sint corporis, provident voluptatem quam odio. Voluptas
            debitis in facilis ex laudantium quos aliquid architecto veritatis? Labore perspiciatis ex consequuntur.
            Repellat nesciunt odio dolor, laudantium excepturi sequi voluptatum? Doloribus laudantium sequi quia quam
            cumque vero eius fugit minima? Debitis qui perferendis laudantium assumenda voluptas corrupti quod? Quaerat
            quo unde non, reprehenderit nihil cum placeat explicabo enim ad quod nobis laudantium ducimus fugiat,
            tempore autem ratione asperiores obcaecati sint maxime voluptatibus delectus. Sequi tempora nisi optio
            dolorem. Exercitationem qui odit aperiam? Minus fugiat sed nihil velit! Eum, nihil beatae natus sapiente
            voluptatem maiores id deserunt molestias quo eaque possimus dolores nisi sunt facere et reprehenderit?
            Facilis, enim? Excepturi quos, totam deserunt hic tenetur vel rem consequatur minima quis minus aut placeat
            nesciunt doloremque reprehenderit, libero ipsam officiis incidunt! Tenetur sed nemo corporis nobis minus eum
            mollitia hic. At nostrum esse reiciendis quae temporibus dolor ullam fugit assumenda rerum praesentium
            provident error commodi expedita minus doloremque, autem repellendus, id eius. Architecto praesentium minus
            est quia, saepe maiores autem! Reprehenderit molestiae eaque, saepe expedita aut eius, ut reiciendis aliquid
            consectetur itaque numquam delectus. Molestias at omnis ut tenetur quis? Quibusdam aut, natus quos eos
            voluptatum nam quas quisquam illo? Dolore aspernatur eius vitae quia ad sapiente doloremque, earum maxime
            cum? Officiis dicta, maiores facere placeat repudiandae, eos, in architecto minima eum quod amet incidunt
            numquam nostrum. Earum, velit magni. Recusandae, tenetur. Tenetur quos consectetur magnam voluptatum eius!
            Placeat, repellendus incidunt! Et perspiciatis atque deserunt labore doloremque, omnis quod, assumenda
            officia sequi rerum error ea sed, quas ut quibusdam laborum. Alias corrupti maxime inventore laboriosam?
            Possimus enim nulla nemo voluptas laboriosam voluptates assumenda et, laudantium ad dolore facilis! Odio,
            voluptate architecto repellendus neque dolores sint! Veniam est architecto quae ex! Atque unde dicta,
            consequatur doloribus quos quam explicabo dolorum soluta. Iure error, sed vel maiores animi aperiam. Hic,
            perspiciatis! Nesciunt nemo enim maxime quos minus. Necessitatibus nulla quis perspiciatis cum. Facilis
            sint, odio vel veniam ullam repellat nisi distinctio voluptatum ratione ab eligendi cumque inventore? Natus
            illum reprehenderit vero aliquid eaque odit? Tempora quaerat quae recusandae, earum repudiandae amet nemo.
            In eum laboriosam tempore ipsa rerum explicabo beatae! Nisi architecto laborum minus dolor alias quo
            exercitationem odio ducimus, ad fugiat magni? Velit, possimus aut ullam vel sequi nihil quas omnis! Sequi
            nemo doloribus quos nesciunt id vero quisquam amet, autem culpa aspernatur eum eos dolore voluptatibus
            consectetur consequuntur alias qui assumenda! Alias, natus nesciunt architecto dicta suscipit fuga veniam
            assumenda! Nemo nihil impedit exercitationem, nesciunt voluptas vitae ipsam sapiente non inventore cum
            labore veritatis molestiae sit. Animi nisi laborum, delectus cum et eius atque repellendus assumenda minus
            consequatur natus similique! Atque officiis ex dolore. Velit, quis! Omnis beatae repellendus rerum, labore
            dolor, consequuntur veniam cupiditate sunt totam quis dolore optio et. Quibusdam, totam quam? Doloribus
            consectetur voluptatibus accusamus quae nostrum. Nihil officiis iusto ipsam tempora earum dolor dicta, ab
            doloremque sapiente architecto hic rerum assumenda adipisci nisi quibusdam sit commodi minima, ullam
            tempore! Architecto natus vero officiis id molestiae voluptatibus. Similique nulla eius in maiores porro
            animi alias voluptates placeat esse deleniti iure cupiditate nihil quas, nisi amet. Vitae sapiente quisquam
            perspiciatis quae debitis fugit ullam consequuntur sunt voluptates blanditiis! Voluptatibus, nobis! Repellat
            cum, exercitationem velit cumque optio nisi ratione. Provident tenetur nam non pariatur quas eos fugit qui
            eaque at harum, quod odit voluptas nesciunt, asperiores optio ipsum cumque. Ullam suscipit sapiente eos sed
            ut soluta odit voluptatem, porro nihil provident, nobis cupiditate facere similique? Nobis, quod et
            veritatis in, laboriosam laudantium ratione nisi odit eligendi, veniam soluta consectetur? Accusamus atque
            enim cupiditate modi unde numquam aliquam officiis a? Delectus mollitia laborum asperiores sequi dolores
            rerum incidunt labore dolorem, porro possimus sed maiores totam quas odit illo fugit fugiat. Odit incidunt
            accusantium obcaecati! Recusandae ad minus corporis! Rem, a quo quaerat at possimus iste ex perspiciatis
            voluptatibus minima, quia in blanditiis fuga, voluptates velit rerum officia ratione sapiente ducimus. Ipsa
            officia ea cum harum sed maxime alias mollitia debitis distinctio sunt voluptatibus vitae quisquam minus,
            saepe iusto ullam aspernatur earum, quia nesciunt. Magni ab tenetur repellat porro dicta omnis! At explicabo
            asperiores quos, in magni unde blanditiis. Cumque ea eligendi in nostrum minima aspernatur possimus,
            reiciendis molestiae iste aut quidem perferendis eaque. Eum, aut at quos porro veniam non. Beatae itaque
            enim, deleniti et ipsum sit sequi dolor facere dolorum delectus ullam ducimus corporis quo officia eum
            molestiae pariatur quibusdam. Neque quod vero, soluta ducimus eos quo culpa sint. Quam ab ipsam laudantium
            voluptates minus. Nobis velit incidunt facilis quos, repellendus aut nam necessitatibus unde! Assumenda, rem
            temporibus! Facilis, veniam quod cumque nihil facere possimus voluptas quasi accusamus deleniti? Sed
            quisquam illum error porro obcaecati ab commodi. Expedita, cum laboriosam recusandae dolorem quae animi
            corporis dicta voluptatum ut totam eos quia quidem molestias deleniti corrupti consequatur reprehenderit est
            voluptas? Sed vero quaerat, tenetur at fuga porro velit quas eius quidem non amet repellat eaque totam
            consequuntur quis, possimus inventore nesciunt praesentium ratione aliquid, ex cum odit laudantium. Dolorum,
            saepe. Error voluptate recusandae cupiditate nisi consequatur reprehenderit, debitis dolorum a velit aliquam
            exercitationem quis sapiente, illo commodi tempore nulla molestiae provident! Architecto explicabo ad
            dignissimos accusamus assumenda, porro quos sint. Ut, est tempore nostrum asperiores accusamus atque ducimus
            eum veritatis cumque pariatur? Molestiae sint error doloribus aliquid laborum soluta illo. Nulla aliquam
            temporibus autem neque ex enim velit soluta suscipit? Quis nesciunt impedit eaque? Expedita maiores magnam
            natus, voluptate reiciendis, voluptatem impedit quis, molestiae nemo dignissimos nostrum sit sequi illo?
            Deserunt laudantium non pariatur excepturi obcaecati nesciunt mollitia molestias accusantium! Voluptatum
            adipisci alias perspiciatis quidem dolorem voluptas iusto quis hic. Delectus quas illo rem dignissimos
            ducimus, fugiat modi quo labore et, odio vitae nesciunt, laborum nam impedit ea. Fugiat, ab! Quo nostrum
            excepturi error corporis odit quisquam eos, nisi totam inventore veritatis delectus at soluta et corrupti ea
            eveniet omnis hic molestiae? Accusamus exercitationem, dolore magni iste et facere accusantium. Natus
            voluptatum optio ullam quo voluptatem! Id, voluptatibus? Ullam, ducimus adipisci? Vero nulla voluptatum
            libero ipsa labore molestiae unde molestias. Quas et, illo dolor tempore accusamus sequi possimus est
            soluta. Necessitatibus sint at ratione atque provident praesentium obcaecati, velit quos quaerat nesciunt
            eius optio corporis, voluptatum, consectetur assumenda suscipit possimus delectus fugit ut laborum ipsa
            expedita repudiandae! Saepe, blanditiis cupiditate! Veniam odit necessitatibus laudantium, suscipit commodi
            voluptate repudiandae alias facere veritatis sapiente? Recusandae veritatis similique nobis, aut accusantium
            molestias corporis rerum perferendis nemo modi reprehenderit dolorem quaerat, velit soluta magnam. Dolore
            sunt aliquam voluptas ducimus aspernatur, totam nihil perspiciatis quod, delectus sit reiciendis facere odit
            eum fugiat provident suscipit iure laboriosam est! Magni sunt tempora eum ad dolorem suscipit doloremque!
            Iste expedita sapiente tempore, culpa sequi nesciunt consequuntur cum pariatur suscipit temporibus nostrum
            commodi, eos magnam, illum deserunt provident ducimus modi ab optio veniam unde delectus et assumenda. Et,
            mollitia? Atque quisquam a deleniti recusandae pariatur sint in et ut natus eos aliquam libero ea magnam
            perferendis at, facilis sed tempora necessitatibus porro obcaecati rerum labore. Ipsum debitis eum eius?
          </h1>
        </div>
      ) : (
        <div className="m-3 flex justify-around bg-gray-800 text-gray-300 rounded-full">
          <Link href="/login">
            <button>LOGIN</button>
          </Link>
          <Link href="/signup">
            <button>SIGNUP</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Home;
